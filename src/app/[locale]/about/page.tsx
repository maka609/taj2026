import React from "react";
import { useTranslations } from "next-intl";
import { Target, Eye, History, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  const t = useTranslations("Navigation");

  return (
    <div className="pt-32 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">{t("about")}</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            نسعى في مدارسنا لبناء أجيال مبدعة، مسلحة بالعلم والقيم، وقادرة على مواجهة تحديات المستقبل بثقة واقتدار.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28">
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="flex items-start gap-6 p-8 bg-blue-50 rounded-3xl border border-blue-100">
              <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center text-white shrink-0">
                <History className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">تاريخنا</h3>
                <p className="text-gray-600 leading-relaxed">
                  تأسست مدارس تاج النزهة اللغوية لتكون منارة للعلم والتربية. على مدار سنوات، نجحنا في تخريج أجيال متميزة ساهمت في بناء المجتمع، معتمدين على أحدث الوسائل التعليمية والمعلمين الأكفاء.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6 p-8 bg-emerald-50 rounded-3xl border border-emerald-100">
              <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shrink-0">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">قيمنا الأساسية</h3>
                <p className="text-gray-600 leading-relaxed">
                  نؤمن بالنزاهة، الإبداع، والاحترام المتبادل. هدفنا ليس فقط التفوق الأكاديمي، بل بناء شخصية متوازنة تعتز بهويتها ومنفتحة على العالم.
                </p>
              </div>
            </div>
          </div>
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20" />
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
              {/* Image Placeholder */}
              صورة المدرسة
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="p-10 bg-white rounded-3xl shadow-lg border border-gray-100 space-y-6 hover:shadow-xl transition-shadow text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mx-auto">
              <Eye className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">رؤيتنا</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              أن نكون المؤسسة التعليمية الرائدة في تقديم تعليم لغوي متطور يمزج بين الأصالة والتكنولوجيا الحديثة، لتمكين طلابنا من التفوق عالمياً.
            </p>
          </div>
          <div className="p-10 bg-white rounded-3xl shadow-lg border border-gray-100 space-y-6 hover:shadow-xl transition-shadow text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mx-auto">
              <Target className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">رسالتنا</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              توفير بيئة تعليمية آمنة ومحفزة تنمي قدرات الطلاب الفكرية والجسدية، وتغرس فيهم حب التعلم والبحث المستمر من خلال برامجنا اللغوية المتكاملة.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
