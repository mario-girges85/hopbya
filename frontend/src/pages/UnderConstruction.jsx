import React from "react";
import { Link } from "react-router-dom";

const pageCopy = {
  en: {
    dir: "ltr",
    badge: "Under Construction",
    heading: "This page is coming soon",
    description:
      "We are working on this section right now and it will be available shortly.",
    home: "Back to Home",
  },
  ar: {
    dir: "rtl",
    badge: "قيد الإنشاء",
    heading: "هذه الصفحة ستتوفر قريبًا",
    description:
      "نعمل حاليًا على هذه الصفحة وستكون متاحة لكم قريبًا.",
    home: "العودة للرئيسية",
  },
};

export default function UnderConstruction({ language = "en" }) {
  const copy = pageCopy[language] || pageCopy.en;

  return (
    <section
      dir={copy.dir}
      className="relative flex min-h-[calc(100dvh-10rem)] items-center justify-center overflow-hidden bg-[#f4edd9] px-5 py-16"
    >
      <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[#d4af37]/25 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-size-[20px_20px] opacity-60" />

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center rounded-3xl border border-[#d8c58d] bg-[#fff9ea] p-8 text-center shadow-[0_20px_60px_rgba(28,21,7,0.22)] sm:p-12">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f3e5b5] text-3xl">
          🚧
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-[#c9a227]/40 bg-[#f7edcc] px-4 py-2 text-xs font-semibold tracking-wide text-[#5a4410]">
          <span className="inline-block h-2 w-2 rounded-full bg-[#c9a227]" />
          {copy.badge}
        </div>

        <h1 className="mt-5 text-3xl font-extrabold leading-tight text-[#1f1b12] sm:text-5xl">
          {copy.heading}
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-7 text-[#4f4329] sm:text-base">
          {copy.description}
        </p>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex justify-center rounded-full bg-[#1f1b12] px-7 py-3 text-sm font-semibold text-[#fff9ea] transition hover:bg-[#2b2417]"
          >
            {copy.home}
          </Link>
        </div>
      </div>
    </section>
  );
}
