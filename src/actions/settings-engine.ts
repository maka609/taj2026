"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { SiteSettingsSchema, type SiteSettings } from "@/lib/settings-schema";
import { cache } from "react";

/**
 * Unified Getter: Retrieves all settings and merges them into a typed object.
 * Cached for performance in Server Components.
 */
export const getSettings = cache(async (): Promise<SiteSettings> => {
  // Default fallback values based on the schema
  const defaultSettings: any = {
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
    },
    smtp: {
      host: "smtp.gmail.com",
      port: 587,
      fromEmail: "no-reply@taj-schools.com",
      fromName: "Taj Schools",
      encryption: "TLS",
    },
    security: {
      maintenanceMode: false,
      allowRegistrations: true,
      sessionTimeout: 30,
    }
  };

  try {
    const allSettings = await prisma.siteSetting.findMany();
    const settings = { ...defaultSettings };

    allSettings.forEach((s) => {
      if (s.key in settings) {
        settings[s.key] = { ...settings[s.key], ...(s.value as object) };
      }
    });

    return settings as SiteSettings;
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    // Return default values as emergency fallback
    return defaultSettings as SiteSettings;
  }
});

/**
 * Unified Update Action: Securely updates a specific section of settings.
 * Only accessible by ADMIN users.
 */
export async function updateSettingAction(key: keyof SiteSettings, value: any) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "ADMIN") {
      return { success: false, error: "Unauthorized: Admin access required" };
    }

    // Dynamic validation based on the key from the Zod schema
    const sectionSchema = (SiteSettingsSchema.shape as any)[key];
    if (!sectionSchema) {
        return { success: false, error: "Invalid settings section: " + key };
    }

    const validated = sectionSchema.parse(value);

    await prisma.siteSetting.upsert({
      where: { key },
      update: { value: validated },
      create: { key, value: validated },
    });

    // Revalidate critical paths
    revalidatePath("/", "layout");
    revalidatePath("/[locale]/admin/settings", "page");
    return { success: true };
  } catch (error: any) {
    console.error(`Update [${key}] setting error:`, error);
    if (error.name === "ZodError") {
        return { success: false, error: `Validation error in ${key}: ${error.errors[0].message}` };
    }
    return { success: false, error: error.message || "Failed to update settings" };
  }
}
