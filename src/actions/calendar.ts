'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { handleActionError } from '@/lib/error-handler'

const eventSchema = z.object({
  titleAr: z.string().min(3),
  titleEn: z.string().min(3),
  description: z.string().optional().nullable(),
  startDate: z.date().or(z.string()),
  endDate: z.date().or(z.string()).optional().nullable(),
  color: z.string().default('#3b82f6'),
})

type EventInput = z.infer<typeof eventSchema>;

export async function getEvents() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { startDate: 'asc' }
    })
    return { success: true, data: events }
  } catch (error) {
    return handleActionError(error, 'فشل في جلب البيانات')
  }
}

export async function createEvent(data: EventInput) {
  try {
    const validated = eventSchema.parse(data)
    const event = await prisma.event.create({
      data: {
        titleAr: validated.titleAr,
        titleEn: validated.titleEn,
        description: validated.description,
        color: validated.color,
        startDate: new Date(validated.startDate),
        endDate: validated.endDate ? new Date(validated.endDate) : null,
      }
    })
    revalidatePath('/admin/calendar')
    return { success: true, data: event }
  } catch (error) {
    return handleActionError(error, 'فشل في الإضافة')
  }
}

export async function updateEvent(id: string, data: Partial<EventInput>) {
    try {
      const validated = eventSchema.partial().parse(data)
      const event = await prisma.event.update({
        where: { id },
        data: {
          ...validated,
          startDate: validated.startDate ? new Date(validated.startDate) : undefined,
          endDate: validated.endDate ? new Date(validated.endDate) : (validated.endDate === null ? null : undefined),
        }
      })
      revalidatePath('/admin/calendar')
      return { success: true, data: event }
    } catch (error) {
      return handleActionError(error, 'فشل في التحديث')
    }
  }

export async function deleteEvent(id: string) {
  try {
    await prisma.event.delete({ where: { id } })
    revalidatePath('/admin/calendar')
    return { success: true }
  } catch (error) {
    return handleActionError(error, 'فشل في الحذف')
  }
}
