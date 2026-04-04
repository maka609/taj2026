import { signOut } from "@/auth";
import { NextResponse } from "next/server";

export async function POST() {
  await signOut({ redirect: false });

  const response = NextResponse.json({ success: true });

  // Explicitly clear the cookie just in case NextAuth.js's signOut didn't handle it
  // though NextAuth.js usually takes care of its own session cookie
  response.cookies.delete("next-auth.session-token");

  return response;
}
