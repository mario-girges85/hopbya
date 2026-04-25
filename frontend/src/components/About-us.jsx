import React from "react";
import aboutImage from "../assets/about us.png";

const copy = {
  ar: {
    badge: "من نحن",
    title: "نصمم تجارب رقمية ذات معنى.",
    description:
      "يجمع فريقنا بين التصميم والهندسة لبناء منتجات حديثة وسريعة تركز على المستخدم. نعمل مع العملاء من التخطيط وحتى الإطلاق لنقدم حلولًا تصنع أثرًا حقيقيًا.",
    primary: "اعرف المزيد",
    secondary: "تواصل معنا",
    imageAlt: "صورة من نحن",
  },
  en: {
    badge: "About Us",
    title: "We design meaningful digital experiences.",
    description:
      "Our team blends design and engineering to build products that are modern, fast, and user-focused. We work closely with clients from strategy to launch to create solutions that make a real impact.",
    primary: "Learn More",
    secondary: "Contact Us",
    imageAlt: "About us image",
  },
};

const AboutUs = ({ language = "ar" }) => {
  const content = copy[language];

  return (
    <section className="w-full px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 overflow-hidden rounded-3xl border border-(--color-border)/30 bg-linear-to-br from-(--color-surface) to-(--color-soft-orange) p-5 shadow-sm md:grid-cols-2 md:gap-10 md:p-8">
        <div className="order-2 space-y-4 md:order-1">
          <p className="text-sm font-semibold uppercase tracking-widest text-(--color-accent-purple)">
            {content.badge}
          </p>
          <h2 className="text-2xl font-bold leading-tight text-(--color-primary-text) sm:text-3xl lg:text-4xl">
            {content.title}
          </h2>
          <p className="text-sm leading-7 text-(--color-secondary-text) sm:text-base">
            {content.description}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              className="rounded-full bg-(--color-accent-purple) px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
            >
              {content.primary}
            </button>
            <button
              type="button"
              className="rounded-full border border-(--color-border) bg-(--color-soft-blue) px-5 py-2.5 text-sm font-semibold text-(--color-accent-blue) transition hover:bg-(--color-main)"
            >
              {content.secondary}
            </button>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <img
            src={aboutImage}
            alt={content.imageAlt}
            className="h-60 w-full rounded-2xl object-cover sm:h-72 md:h-[420px]"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
