'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getMessages(filter?: 'all' | 'read' | 'unread') {
  try {
    const where = filter === 'read' ? { read: true } : filter === 'unread' ? { read: false } : {}
    
    const messages = await prisma.message.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    })
    
    return { success: true, data: messages }
  } catch (error) {
    console.error('Error fetching messages:', error)
    return { success: false, error: 'فشل في جلب البيانات' }
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
    console.error('Error marking message:', error)
    return { success: false, error: 'فشل في التحديث' }
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
    console.error('Error deleting message:', error)
    return { success: false, error: 'فشل في الحذف' }
  }
}
