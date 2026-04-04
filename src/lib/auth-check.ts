import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

/**
 * Server-side authentication and role check for Admin components.
 */
export async function adminAuthCheck() {
  const session = await auth();

  if (!session || session.user.role !== "ADMIN") {
    // Get locale from cookie for redirect
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value || "ar";
    redirect(`/${locale}/portal/login`);
  }

  return session;
}

/**
 * Server-side authentication check for general Dashboard components.
 */
export async function dashboardAuthCheck() {
  const session = await auth();

  if (!session) {
    const cookieStore = await cookies();
    const locale = cookieStore.get("NEXT_LOCALE")?.value || "ar";
    redirect(`/${locale}/portal/login`);
  }

  return session;
}
