"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { z } from "zod";
import { headers } from "next/headers";

// --- In-Memory Login Failure Store (Action-side) ---
const loginFailures = new Map<string, { count: number; lastFailure: number }>();

function getIP() {
  const headersList = headers();
  const forwarded = headersList.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "127.0.0.1";
}

const loginSchema = z.object({
  email: z.string().email("البريد الإلكتروني غير صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

export async function loginAction(formData: FormData) {
  const ip = getIP();
  const failureData = loginFailures.get(ip) || { count: 0, lastFailure: 0 };

  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // Brute-force delay
    let delay = 800;
    if (failureData.count > 3) {
      delay += 500; // Extra 500ms slowdown after 3 fails
    }
    await new Promise(resolve => setTimeout(resolve, delay));

    // Strict validation
    loginSchema.parse({ email, password });

    await signIn("credentials", { email, password, redirect: false });

    // Clear failures on success
    loginFailures.delete(ip);

    return { success: true };
  } catch (error) {
    // Increment failure count
    loginFailures.set(ip, {
      count: failureData.count + 1,
      lastFailure: Date.now(),
    });

    if (error instanceof z.ZodError) {
      return { error: error.issues[0].message };
    }
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "البريد الإلكتروني أو كلمة المرور غير صحيحة." };
        default:
          return { error: "حدث خطأ غير متوقع أثناء تسجيل الدخول." };
      }
    }
    throw error; // Let Next.js handle redirect errors thrown by signIn
  }
}
