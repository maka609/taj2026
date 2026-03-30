'use client'

import React, { useState } from 'react'
import { updateAdmissionStatus } from '@/actions/admissions'

interface Admission {
  id: string
  studentNameAr: string
  gradeApplying: string
  dateOfBirth: Date
  parentEmail: string
  status: string
  createdAt: Date
}

export default function AdmissionsClient({ initialData }: { initialData: Admission[] }) {
  const [admissions, setAdmissions] = useState(initialData)
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState<string | null>(null)

  const filteredAdmissions = filter === 'all' 
    ? admissions 
    : admissions.filter(a => a.status === filter.toUpperCase())

  const handleStatusChange = async (id: string, status: any) => {
    setLoading(id)
    const result = await updateAdmissionStatus(id, status)
    if (result.success) {
      setAdmissions(admissions.map(a => 
        a.id === id ? { ...a, status } : a
      ))
    }
    setLoading(null)
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      REVIEWING: 'bg-blue-100 text-blue-800',
      APPROVED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800',
    }
    const labels = {
      PENDING: 'قيد الانتظار',
      REVIEWING: 'قيد المراجعة',
      APPROVED: 'مقبول',
      REJECTED: 'مرفوض',
    }
    return (
      <span className={`px-3 py-1 text-xs font-medium rounded-full ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition ${filter === 'all' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            الكل ({admissions.length})
          </button>
          <button 
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg transition ${filter === 'pending' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            قيد الانتظار ({admissions.filter(a => a.status === 'PENDING').length})
          </button>
          <button 
            onClick={() => setFilter('reviewing')}
            className={`px-4 py-2 rounded-lg transition ${filter === 'reviewing' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            قيد المراجعة ({admissions.filter(a => a.status === 'REVIEWING').length})
          </button>
          <button 
            onClick={() => setFilter('approved')}
            className={`px-4 py-2 rounded-lg transition ${filter === 'approved' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            مقبول ({admissions.filter(a => a.status === 'APPROVED').length})
          </button>
        </div>
      </div>

      {filteredAdmissions.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">لا توجد طلبات قبول</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">اسم الطالب</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الصف</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">تاريخ الميلاد</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">البريد</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">الحالة</th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-700">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAdmissions.map((admission) => (
                <tr key={admission.id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-sm text-gray-900">{admission.studentNameAr}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{admission.gradeApplying}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(admission.dateOfBirth).toLocaleDateString('ar-EG')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{admission.parentEmail}</td>
                  <td className="px-6 py-4">{getStatusBadge(admission.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {admission.status !== 'APPROVED' && (
                        <button 
                          onClick={() => handleStatusChange(admission.id, 'APPROVED')}
                          disabled={loading === admission.id}
                          className="text-green-600 hover:underline text-sm disabled:opacity-50"
                        >
                          قبول
                        </button>
                      )}
                      {admission.status !== 'REJECTED' && (
                        <button 
                          onClick={() => handleStatusChange(admission.id, 'REJECTED')}
                          disabled={loading === admission.id}
                          className="text-red-600 hover:underline text-sm disabled:opacity-50"
                        >
                          رفض
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
