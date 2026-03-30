import React from "react";
import { useTranslations } from "next-intl";
import { Users, GraduationCap, Briefcase } from "lucide-react";

const staffCategories = [
  {
    title: "الإدارة المدرسية",
    icon: Briefcase,
    members: [
      { name: "أ.د. محمد السعيد", role: "مدير المدرسة", image: null },
      { name: "أ. فاطمة الزهراء", role: "وكيل المدرسة لشؤون الطلاب", image: null },
      { name: "أ. محمود إبراهيم", role: "المدير المالي والإداري", image: null },
    ]
  },
  {
    title: "هيئة التدريس - المرحلة الابتدائية",
    icon: GraduationCap,
    members: [
      { name: "أ. سارة حسن", role: "معلم أول لغة عربية", image: null },
      { name: "Mr. David Smith", role: "English Senior Teacher", image: null },
      { name: "أ. ياسمين كمال", role: "معلم مادة الرياضيات", image: null },
      { name: "أ. هاني يوسف", role: "معلم مادة العلوم", image: null },
      { name: "أ. منى زكي", role: "معلم مادة الدراسات الاجتماعية", image: null },
      { name: "أ. خالد عبد الرحمن", role: "معلم التربية الرياضية", image: null },
    ]
  }
];

export default function StaffPage() {
  const t = useTranslations("Navigation");

  return (
    <div className="pt-32 pb-20 px-4 min-h-screen bg-gray-50" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto mb-6 shadow-sm">
            <Users className="w-12 h-12" />
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">{t("staff")}</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-sans">
            نفتخر بنخبة من أفضل الكوادر التعليمية والإدارية الذين يكرسون جهودهم لتقديم أفضل تجربة تعليمية لأبنائنا.
          </p>
        </div>

        {staffCategories.map((category, catIdx) => (
          <div key={catIdx} className="mb-24 last:mb-0">
            <div className="flex items-center gap-4 mb-12 border-b border-gray-200 pb-6">
              <div className="p-3 bg-white rounded-2xl shadow-sm">
                <category.icon className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">{category.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {category.members.map((member, memIdx) => (
                <div key={memIdx} className="group bg-white p-6 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full bg-gray-200 mb-6 flex items-center justify-center group-hover:scale-105 transition-transform overflow-hidden relative shadow-inner">
                    <Users className="w-12 h-12 text-gray-400 opacity-50" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="text-xl font-extrabold text-gray-900 mb-2 truncate max-w-full">{member.name}</h3>
                  <p className="text-sm font-semibold text-primary/80 bg-primary/5 px-4 py-1.5 rounded-full inline-block mb-4">{member.role}</p>
                  <p className="text-xs text-gray-400 line-clamp-2">خبير تعليمي يتمتع بخبرة تزيد عن 10 سنوات في مجال التربية والتعليم.</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-20 p-12 bg-primary rounded-3xl text-white text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700" />
          <div className="relative z-10">
            <h3 className="text-3xl font-extrabold mb-6">هل تود الانضمام لفريقنا؟</h3>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">نحن دائماً نبحث عن الكوادر المتميزة والمبدعة للانضمام إلى أسرة مدارس تاج النزهة.</p>
            <button 
              onClick={() => window.location.href = "/ar/careers"}
              className="px-10 py-4 bg-white text-primary rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-xl"
            >
              عرض الوظائف المتاحة
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
