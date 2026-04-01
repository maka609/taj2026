import { z } from "zod";

export const SiteSettingsSchema = z.object({
  general: z.object({
    siteNameAr: z.string().min(1, "اسم الموقع بالعربية مطلوب"),
    siteNameEn: z.string().min(1, "Site Name in English is required"),
    logoUrl: z.string().optional().nullable(),
    faviconUrl: z.string().optional().nullable(),
    primaryColor: z.string().min(1),
    secondaryColor: z.string().min(1),
    gpcEnabled: z.boolean().default(true),
  }),
  academic: z.object({
    registrationStatus: z.enum(["open", "closed", "coming_soon"]).default("open"),
    currentSemester: z.string().optional(),
    academicYear: z.string().optional(),
  }),
  social: z.object({
    facebook: z.string().url().or(z.literal("")).optional().nullable(),
    instagram: z.string().url().or(z.literal("")).optional().nullable(),
    youtube: z.string().url().or(z.literal("")).optional().nullable(),
    twitter: z.string().url().or(z.literal("")).optional().nullable(),
  }),
  seo: z.object({
    organizationName: z.string().optional(),
    description: z.string().optional(),
    keywords: z.string().optional(),
    schema: z.any().optional(),
  }),
  contact: z.object({
    email: z.string().email("البريد الإلكتروني غير صحيح"),
    phone: z.string().optional().nullable(),
    addressAr: z.string().optional().nullable(),
    addressEn: z.string().optional().nullable(),
    whatsapp: z.string().optional().nullable(),
  }),
  smtp: z.object({
    host: z.string().min(1, "المضيف مطلوب"),
    port: z.number().int().positive(),
    user: z.string().optional().nullable(),
    pass: z.string().optional().nullable(),
    fromEmail: z.string().email("بريد المرسل غير صحيح"),
    fromName: z.string().min(1, "اسم المرسل مطلوب"),
    encryption: z.enum(["SSL", "TLS", "None"]).default("TLS"),
  }),
  security: z.object({
    maintenanceMode: z.boolean().default(false),
    allowRegistrations: z.boolean().default(true),
    sessionTimeout: z.number().int().default(30),
  })
});

export type SiteSettings = z.infer<typeof SiteSettingsSchema>;
