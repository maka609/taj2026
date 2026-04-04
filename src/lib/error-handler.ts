import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";

/**
 * Shared error handler for API Routes (NextResponse)
 */
export function handleApiError(error: unknown) {
  // Log real error server-side
  console.error("[API Error]:", error);

  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { success: false, error: "بيانات غير صالحة", details: error.errors },
      { status: 400 }
    );
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle specific Prisma errors if needed, but return generic to client
    return NextResponse.json(
      { success: false, error: "خطأ في قاعدة البيانات" },
      { status: 500 }
    );
  }

  // Fallback generic error
  return NextResponse.json(
    { success: false, error: "Something went wrong / حدث خطأ ما" },
    { status: 500 }
  );
}

/**
 * Shared error handler for Server Actions (Simple Object)
 */
export function handleActionError(error: unknown, defaultMessage = "حدث خطأ ما") {
  // Log real error server-side
  console.error("[Action Error]:", error);

  if (error instanceof z.ZodError) {
    return { success: false, error: error.errors[0].message };
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return { success: false, error: "خطأ في قاعدة البيانات" };
  }

  // Fallback generic error
  return { success: false, error: defaultMessage };
}
