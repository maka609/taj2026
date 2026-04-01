"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { SiteSettingsSchema, type SiteSettings } from "@/lib/settings-schema";
import { cache } from "react";

// Cached getter for RSC performance
export const getSettings = cache(async (): Promise<SiteSettings | null> => {
  try {
    const allSettings = await prisma.siteSetting.findMany();

    // Default fallback values
    const settings: any = {
      general: {
        siteNameAr: "مدارس تاج النزهة",
        siteNameEn: "Taj Schools",
        primaryColor: "#7c3aed",
        secondaryColor: "#ea580c",
        gpcEnabled: true,
      },
      academic: {
        registrationStatus: "open",
      },
      social: {},
      seo: {},
      contact: {
        email: "info@taj-schools.com",
      }
    };

    allSettings.forEach((s) => {
      settings[s.key] = s.value;
    });

    return settings as SiteSettings;
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return null;
  }
});

export async function updateSettingAction(key: keyof SiteSettings, value: any) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "ADMIN") {
      return { success: false, error: "Unauthorized: Admin only" };
    }

    // Partial validation based on the key
    const sectionSchema = (SiteSettingsSchema.shape as any)[key];
    if (!sectionSchema) {
        return { success: false, error: "Invalid settings section" };
    }

    const validated = sectionSchema.parse(value);

    await prisma.siteSetting.upsert({
      where: { key },
      update: { value: validated },
      create: { key, value: validated },
    });

    revalidatePath("/", "layout");
    return { success: true };
  } catch (error: any) {
    console.error("Update setting error:", error);
    return { success: false, error: error.message || "Failed to update setting" };
  }
}
