"use server"

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { GlobalSettingsSchema, SMTPConfigSchema } from "@/lib/schemas";

// Actions
export async function getGlobalSettings() {
  try {
    const settings = await prisma.globalSettings.findUnique({
      where: { id: "master" }
    });
    return { success: true, data: settings };
  } catch (error) {
    return { success: false, error: "فشل في جلب الإعدادات العالمية" };
  }
}

export async function updateGlobalSettings(data: z.infer<typeof GlobalSettingsSchema>) {
  try {
    const validated = GlobalSettingsSchema.parse(data);

    await prisma.globalSettings.upsert({
      where: { id: "master" },
      update: validated,
      create: { id: "master", ...validated }
    });

    revalidatePath("/", "layout");
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
        return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: "فشل في تحديث الإعدادات العالمية" };
  }
}

export async function getSMTPConfig() {
  try {
    const config = await prisma.sMTPConfig.findUnique({
      where: { id: "master" }
    });
    return { success: true, data: config };
  } catch (error) {
    return { success: false, error: "فشل في جلب إعدادات SMTP" };
  }
}

export async function updateSMTPConfig(data: z.infer<typeof SMTPConfigSchema>) {
  try {
    const validated = SMTPConfigSchema.parse(data);

    await prisma.sMTPConfig.upsert({
      where: { id: "master" },
      update: validated,
      create: { id: "master", ...validated }
    });

    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
        return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: "فشل في تحديث إعدادات SMTP" };
  }
}

// Keep legacy for compatibility if needed, but update to revalidate more broadly
export async function updateSettings(data: Record<string, string>) {
  try {
    for (const [key, value] of Object.entries(data)) {
      await prisma.siteSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value }
      });
    }

    revalidatePath("/", "layout");
    revalidatePath("/admin/settings");
    return { success: true };
  } catch (error) {
    return { success: false, error: "فشل في حفظ الإعدادات" };
  }
}
