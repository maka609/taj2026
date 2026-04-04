"use server"

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { handleActionError } from "@/lib/error-handler";

const careerSchema = z.object({
  titleAr: z.string().min(3),
  titleEn: z.string().min(3),
  descriptionAr: z.string().min(10),
  descriptionEn: z.string().min(10),
  department: z.string().min(2),
  deadline: z.date().or(z.string()).optional().nullable(),
  active: z.boolean().default(true),
});

type CareerInput = z.infer<typeof careerSchema>;

export async function getCareers() {
  try {
    const careers = await prisma.career.findMany({
      include: {
        _count: {
          select: { applications: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    return { success: true, data: careers };
  } catch (error) {
    return handleActionError(error, "فشل في جلب الوظائف");
  }
}

export async function createCareer(data: CareerInput) {
  try {
    const validated = careerSchema.parse(data);
    const career = await prisma.career.create({
      data: {
          titleAr: validated.titleAr,
          titleEn: validated.titleEn,
          descriptionAr: validated.descriptionAr,
          descriptionEn: validated.descriptionEn,
          department: validated.department,
          active: validated.active,
          deadline: validated.deadline ? new Date(validated.deadline) : null,
      }
    });
    revalidatePath("/admin/careers");
    return { success: true, data: career };
  } catch (error) {
    return handleActionError(error, "فشل في إضافة الوظيفة");
  }
}

export async function updateCareer(id: string, data: Partial<CareerInput>) {
  try {
    const validated = careerSchema.partial().parse(data);
    const career = await prisma.career.update({
      where: { id },
      data: {
          ...validated,
          deadline: validated.deadline ? new Date(validated.deadline) : null,
      }
    });
    revalidatePath("/admin/careers");
    return { success: true, data: career };
  } catch (error) {
    return handleActionError(error, "فشل في تحديث الوظيفة");
  }
}

export async function deleteCareer(id: string) {
  try {
    await prisma.career.delete({
      where: { id }
    });
    revalidatePath("/admin/careers");
    return { success: true };
  } catch (error) {
    return handleActionError(error, "فشل في حذف الوظيفة");
  }
}

export async function updateCareerStatus(id: string, active: boolean) {
    try {
      await prisma.career.update({
        where: { id },
        data: { active }
      });
      revalidatePath("/admin/careers");
      return { success: true };
    } catch (error) {
      return handleActionError(error, "فشل في تحديث الحالة");
    }
}
