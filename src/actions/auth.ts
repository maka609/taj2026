"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function loginAction(formData: FormData) {
  try {
    await signIn("credentials", formData);
    return { success: true };
  } catch (error) {
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
