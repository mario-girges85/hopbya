import React from "react";
import teachingIllustration from "../assets/teaching-illustration.svg";
import learningIllustration from "../assets/learning-illustration.svg";

const labels = {
  ar: {
    title: "اختر مسارك",
    subtitle: "حدد الطريقة المناسبة لك وابدأ رحلتك معنا اليوم.",
    teaching: "التدريس",
    learning: "التعلم",
    teachingDesc: "شارك خبرتك مع الطلاب عبر دروس منظمة وأدوات تفاعلية.",
    learningDesc: "تعلّم بخطوات واضحة، محتوى عملي، ومتابعة مستمرة.",
    teachingAlt: "صورة توضيحية للتدريس",
    learningAlt: "صورة توضيحية للتعلم",
  },
  en: {
    title: "Choose Your Path",
    subtitle: "Pick the track that fits you best and start today.",
    teaching: "Teaching",
    learning: "Learning",
    teachingDesc: "Share your expertise through structured lessons and live guidance.",
    learningDesc: "Learn with clear steps, practical content, and ongoing support.",
    teachingAlt: "Teaching illustration",
    learningAlt: "Learning illustration",
  },
};

const TeachingLearning = ({ language = "ar" }) => {
  const content = labels[language];

  return (
    <section className="w-full px-4 pb-12 sm:px-6 md:pb-16 lg:px-8">
      <div className="mx-auto w-full max-w-7xl rounded-3xl border border-(--color-border)/30 bg-linear-to-br from-(--color-surface) via-(--color-main) to-(--color-soft-teal) p-6 shadow-sm sm:p-8">
        <div className="mb-6 text-center md:mb-8">
          <h3 className="text-xl font-bold text-(--color-primary-text) sm:text-2xl">
            {content.title}
          </h3>
          <p className="mt-2 text-sm text-(--color-secondary-text) sm:text-base">
            {content.subtitle}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <article className="group overflow-hidden rounded-2xl border border-(--color-border)/35 bg-white/70 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <img
              src={teachingIllustration}
              alt={content.teachingAlt}
              className="h-48 w-full object-cover sm:h-56"
            />
            <div className="space-y-3 p-5">
              <h4 className="text-lg font-bold text-(--color-primary-text)">
                {content.teaching}
              </h4>
              <p className="text-sm leading-7 text-(--color-secondary-text)">
                {content.teachingDesc}
              </p>
              <button
                type="button"
                className="w-full rounded-full bg-(--color-accent-teal) px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-(--color-accent-blue)"
              >
                {content.teaching}
              </button>
            </div>
          </article>

          <article className="group overflow-hidden rounded-2xl border border-(--color-border)/35 bg-white/70 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <img
              src={learningIllustration}
              alt={content.learningAlt}
              className="h-48 w-full object-cover sm:h-56"
            />
            <div className="space-y-3 p-5">
              <h4 className="text-lg font-bold text-(--color-primary-text)">
                {content.learning}
              </h4>
              <p className="text-sm leading-7 text-(--color-secondary-text)">
                {content.learningDesc}
              </p>
              <button
                type="button"
                className="w-full rounded-full border border-(--color-border) bg-(--color-soft-blue) px-6 py-2.5 text-sm font-semibold text-(--color-accent-blue) transition hover:bg-(--color-surface)"
              >
                {content.learning}
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default TeachingLearning;
