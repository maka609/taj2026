import { signOut } from "@/auth";
import { NextResponse } from "next/server";
import { handleApiError } from "@/lib/error-handler";

export async function POST() {
  try {
    await signOut({ redirect: false });

    const response = NextResponse.json({ success: true });

    // Explicitly clear the cookie just in case NextAuth.js's signOut didn't handle it
    // though NextAuth.js usually takes care of its own session cookie
    response.cookies.delete("next-auth.session-token");

    return response;
  } catch (error) {
    return handleApiError(error);
  }
}
