"use server"

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getBackups() {
  try {
    const backups = await prisma.backup.findMany({
      orderBy: { createdAt: "desc" }
    });
    return { success: true, data: backups };
  } catch (error) {
    return { success: false, error: "فشل في جلب النسخ الاحتياطية" };
  }
}

export async function createBackup(label: string, fileUrl: string) {
  try {
    const backup = await prisma.backup.create({
      data: { label, fileUrl }
    });
    revalidatePath("/admin/unified-backup");
    return { success: true, data: backup };
  } catch (error) {
    return { success: false, error: "فشل في إنشاء النسخة الاحتياطية" };
  }
}

export async function deleteBackup(id: string) {
  try {
    await prisma.backup.delete({
      where: { id }
    });
    revalidatePath("/admin/unified-backup");
    return { success: true };
  } catch (error) {
    return { success: false, error: "فشل في حذف النسخة الاحتياطية" };
  }
}
