import React from "react";
import logoImage from "../assets/logo.png";

const footerCopy = {
  ar: {
    description:
      "منصة تربط بين التعليم والتعلم من خلال تجربة رقمية سهلة وعملية.",
    quickLinksTitle: "روابط سريعة",
    links: ["الرئيسية", "من نحن", "الخدمات", "تواصل معنا"],
    contactTitle: "تواصل",
    email: "البريد: hello@hobpya.com",
    phone: "الهاتف: +20 100 000 0000",
    rights: "جميع الحقوق محفوظة لدى Hobpya.",
  },
  en: {
    description:
      "A platform connecting teaching and learning through a simple, practical digital experience.",
    quickLinksTitle: "Quick Links",
    links: ["Home", "About", "Services", "Contact"],
    contactTitle: "Contact",
    email: "Email: hello@hobpya.com",
    phone: "Phone: +20 100 000 0000",
    rights: "All rights reserved by Hobpya.",
  },
};

const Footer = ({ language = "ar" }) => {
  const content = footerCopy[language];

  return (
    <footer className="mt-10 w-full border-t border-(--color-border)/40 bg-white/40">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Hobpya logo" className="h-10 w-auto" />
            {/* <p className="text-lg font-bold text-(--color-primary-text)">Hobpya</p> */}
          </div>
          <p className="max-w-sm text-sm leading-7 text-(--color-secondary-text)">
            {content.description}
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-(--color-accent-blue)">
            {content.quickLinksTitle}
          </h4>
          <ul className="space-y-2 text-sm text-(--color-secondary-text)">
            {content.links.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="transition hover:text-(--color-accent-purple)"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-(--color-accent-teal)">
            {content.contactTitle}
          </h4>
          <div className="space-y-2 text-sm text-(--color-secondary-text)">
            <p>{content.email}</p>
            <p>{content.phone}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-(--color-border)/30 px-4 py-4 text-center text-xs text-(--color-secondary-text) sm:px-6 lg:px-8">
        {new Date().getFullYear()} - {content.rights}
      </div>
    </footer>
  );
};

export default Footer;
