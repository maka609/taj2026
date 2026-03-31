"use server"

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSettings() {
  try {
    const settings = await prisma.siteSetting.findMany();
    // Convert array of settings to a key-value object
    const settingsMap: Record<string, string> = {};
    settings.forEach(s => {
      settingsMap[s.key] = s.value;
    });
    return { success: true, data: settingsMap };
  } catch (error) {
    return { success: false, error: "فشل في جلب الإعدادات" };
  }
}

export async function updateSettings(data: Record<string, string>) {
  try {
    // Sequential updates for Prisma site settings
    for (const [key, value] of Object.entries(data)) {
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value }
      });
    }

    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    console.error("Error updating settings:", error);
    return { success: false, error: "فشل في حفظ الإعدادات" };
  }
}
