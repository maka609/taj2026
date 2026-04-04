"use server"

import prisma from "@/lib/prisma";
import { handleActionError } from "@/lib/error-handler";

export async function getSecurityLogs() {
  try {
    const logs = await prisma.securityLog.findMany({
      include: {
        user: {
          select: { name: true, email: true }
        }
      },
      orderBy: { createdAt: "desc" },
      take: 50
    });
    return { success: true, data: logs };
  } catch (error) {
    return handleActionError(error, "فشل في جلب السجلات الأمنية");
  }
}

export async function createSecurityLog(action: string, details?: string, userId?: string) {
    try {
        await prisma.securityLog.create({
            data: {
                action,
                details,
                userId
            }
        });
        return { success: true };
    } catch (error) {
        return handleActionError(error, "فشل في تسجيل الحركة الأمنية");
    }
}
