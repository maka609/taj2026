import React from "react";
import { getSliders } from "@/actions/sliders";
import { getNews } from "@/actions/news";
import { getTestimonials } from "@/actions/testimonials";
import { getGlobalSettings } from "@/actions/settings";
import HomeClient from "./HomeClient";
import { getLocale, getTranslations } from "next-intl/server";

export default async function HomePage() {
  const locale = await getLocale();
  const t = await getTranslations("Navigation");

  const [sliders, news, testimonials, settings] = await Promise.all([
    getSliders(),
    getNews(),
    getTestimonials(),
    getGlobalSettings(),
  ]);

  return (
    <HomeClient
      locale={locale}
      sliders={(sliders.success ? sliders.data : []) as any[]}
      news={(news.success ? news.data : []) as any[]}
      testimonials={(testimonials.success ? testimonials.data : []) as any[]}
      settings={settings.success ? settings.data : null}
    />
  );
}
