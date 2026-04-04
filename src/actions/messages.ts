'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { handleActionError } from '@/lib/error-handler'

const messageSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  subject: z.string().min(5),
  message: z.string().min(10),
  phone: z.string().optional().nullable(),
})

export async function getMessages(filter?: 'all' | 'read' | 'unread') {
  try {
    const where = filter === 'read' ? { read: true } : filter === 'unread' ? { read: false } : {}
    
    const messages = await prisma.message.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })
    
    return { success: true, data: messages }
  } catch (error) {
    return handleActionError(error, 'فشل في جلب البيانات')
  }
}

export async function markAsRead(id: string) {
  try {
    await prisma.message.update({
      where: { id },
      data: { read: true }
    })
    
    revalidatePath('/admin/messages')
    return { success: true }
  } catch (error) {
    return handleActionError(error, 'فشل في التحديث')
  }
}

export async function deleteMessage(id: string) {
  try {
    await prisma.message.delete({
      where: { id }
    })
    
    revalidatePath('/admin/messages')
    return { success: true }
  } catch (error) {
    return handleActionError(error, 'فشل في الحذف')
  }
}

export async function sendMessage(data: z.infer<typeof messageSchema>) {
  try {
    const validated = messageSchema.parse(data)
    const newMessage = await prisma.message.create({
      data: {
        name: validated.name,
        email: validated.email,
        subject: validated.subject,
        message: validated.message,
        phone: validated.phone || "",
      }
    });

    revalidatePath('/admin/messages');
    return { success: true, data: newMessage };
  } catch (error) {
    return handleActionError(error, 'فشل في إرسال الرسالة');
  }
}
