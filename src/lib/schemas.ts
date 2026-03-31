import { z } from "zod";

export const GlobalSettingsSchema = z.object({
  siteNameAr: z.string().min(1, "اسم الموقع بالعربية مطلوب"),
  siteNameEn: z.string().min(1, "Site Name in English is required"),
  logoUrl: z.string().optional().nullable(),
  heroTitleAr: z.string().min(1, "عنوان الهيرو بالعربية مطلوب"),
  heroTitleEn: z.string().min(1, "Hero Title in English is required"),
  heroSubtitleAr: z.string().optional().nullable(),
  heroSubtitleEn: z.string().optional().nullable(),
  primaryColor: z.string().min(1),
  secondaryColor: z.string().min(1),
  facebookUrl: z.string().url().optional().or(z.literal("")).nullable(),
  instagramUrl: z.string().url().optional().or(z.literal("")).nullable(),
  youtubeUrl: z.string().url().optional().or(z.literal("")).nullable(),
  twitterUrl: z.string().url().optional().or(z.literal("")).nullable(),
  contactEmail: z.string().email("البريد الإلكتروني غير صحيح"),
  contactPhone: z.string().optional().nullable(),
  contactAddressAr: z.string().optional().nullable(),
  contactAddressEn: z.string().optional().nullable(),
});

export const SMTPConfigSchema = z.object({
  host: z.string().min(1, "المضيف مطلوب"),
  port: z.number().int().positive(),
  user: z.string().optional().nullable(),
  pass: z.string().optional().nullable(),
  fromEmail: z.string().email("البريد الإلكتروني للمرسل غير صحيح"),
  fromName: z.string().min(1, "اسم المرسل مطلوب"),
});
