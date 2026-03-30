'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const eventSchema = z.object({
  titleAr: z.string().min(3),
  titleEn: z.string().min(3),
  description: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  color: z.string().default('#3b82f6'),
})

export async function getEvents() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { startDate: 'asc' }
    })
    return { success: true, data: events }
  } catch (error) {
    console.error('Error fetching events:', error)
    return { success: false, error: 'فشل في جلب البيانات' }
  }
}

export async function createEvent(data: z.infer<typeof eventSchema>) {
  try {
    const validated = eventSchema.parse(data)
    const event = await prisma.event.create({
      data: {
        ...validated,
        startDate: new Date(validated.startDate),
        endDate: validated.endDate ? new Date(validated.endDate) : null,
      }
    })
    revalidatePath('/admin/calendar')
    return { success: true, data: event }
  } catch (error) {
    console.error('Error creating event:', error)
    return { success: false, error: 'فشل في الإضافة' }
  }
}

export async function deleteEvent(id: string) {
  try {
    await prisma.event.delete({ where: { id } })
    revalidatePath('/admin/calendar')
    return { success: true }
  } catch (error) {
    console.error('Error deleting event:', error)
    return { success: false, error: 'فشل في الحذف' }
  }
}
