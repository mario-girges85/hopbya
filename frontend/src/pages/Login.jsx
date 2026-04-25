import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginImage from "../assets/login.png";

const loginCopy = {
  ar: {
    title: "تسجيل الدخول",
    subtitle: "مرحبًا بعودتك. أدخل بياناتك للمتابعة.",
    email: "البريد الإلكتروني أو رقم الهاتف",
    password: "كلمة المرور",
    submit: "دخول",
    submitting: "جاري تسجيل الدخول...",
    noAccount: "ليس لديك حساب؟",
    signup: "إنشاء حساب",
    back: "الرئيسية",
    required: "هذا الحقل مطلوب",
    submitError: "فشل تسجيل الدخول. تحقق من البيانات وحاول مجددًا.",
  },
  en: {
    title: "Sign in",
    subtitle: "Welcome back. Enter your details to continue.",
    email: "Email or phone number",
    password: "Password",
    submit: "Sign in",
    submitting: "Signing in...",
    noAccount: "Don't have an account?",
    signup: "Sign up",
    back: "Home",
    required: "This field is required",
    submitError: "Could not sign in. Check your details and try again.",
  },
};

const Login = ({ language = "ar" }) => {
  const content = loginCopy[language];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");

  const inputClass =
    "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-[#faf6e8] outline-none transition placeholder:text-white/35 focus:border-[#d4af37]/80 focus:ring-2 focus:ring-[#d4af37]/25";

  const getFieldErrors = (emailVal, passwordVal) => {
    const next = {};
    if (!emailVal.trim()) next.email = "required";
    if (!passwordVal) next.password = "required";
    return next;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitAttempted(true);
    const nextErrors = getFieldErrors(email, password);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const apiBaseUrl = import.meta.env.VITE_DEMO_API_URL;
    if (!apiBaseUrl) {
      setSubmitStatus("error");
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitStatus("idle");
      const response = await fetch(`${apiBaseUrl}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailOrPhone: email.trim(), password }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSubmitStatus("success");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const showFieldError = (field) => submitAttempted && errors[field];

  return (
    <section className="w-full bg-[#0a0a0a] text-[#faf6e8]">
      <div
        className={`mx-auto flex min-h-[calc(100dvh-10rem)] max-w-7xl flex-col lg:min-h-[calc(100dvh-8rem)] lg:flex-row ${
          language === "ar" ? "lg:flex-row-reverse" : ""
        }`}
      >
        <div className="relative flex min-h-[240px] w-full flex-1 overflow-hidden lg:min-h-[min(720px,calc(100dvh-8rem))]">
          <img
            src={loginImage}
            alt=""
            className="h-full w-full object-cover object-[center_25%]"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-transparent lg:bg-linear-to-r lg:from-transparent lg:via-[#0a0a0a]/40 lg:to-[#0a0a0a]"
            aria-hidden
          />
        </div>

        <div className="flex w-full flex-1 flex-col justify-center px-6 py-10 sm:px-10 lg:max-w-lg lg:shrink-0 lg:px-12 xl:px-16">
          <div className="mx-auto w-full max-w-md">
            <h1 className="text-2xl font-bold tracking-tight text-[#fffef5] sm:text-3xl">
              {content.title}
            </h1>
            <p className="mt-2 text-sm text-white/65 sm:text-base">
              {content.subtitle}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
              <div>
                <input
                  name="email"
                  type="text"
                  autoComplete="username"
                  inputMode="text"
                  placeholder={content.email}
                  value={email}
                  onChange={(e) => {
                    const value = e.target.value;
                    setEmail(value);
                    if (submitAttempted)
                      setErrors(getFieldErrors(value, password));
                  }}
                  className={inputClass}
                />
                {showFieldError("email") && (
                  <p className="mt-1 text-xs text-red-400">
                    {content.required}
                  </p>
                )}
              </div>
              <div>
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder={content.password}
                  value={password}
                  onChange={(e) => {
                    const value = e.target.value;
                    setPassword(value);
                    if (submitAttempted)
                      setErrors(getFieldErrors(email, value));
                  }}
                  className={inputClass}
                />
                {showFieldError("password") && (
                  <p className="mt-1 text-xs text-red-400">
                    {content.required}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full rounded-full bg-[#c9a227] px-6 py-3 text-sm font-semibold text-[#1a1208] transition hover:bg-[#d4af37] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? content.submitting : content.submit}
              </button>
            </form>

            {submitStatus === "error" && (
              <p className="mt-4 text-sm font-medium text-red-400">
                {content.submitError}
              </p>
            )}
            {submitStatus === "success" && (
              <p className="mt-4 text-sm font-medium text-emerald-400">
                {language === "ar"
                  ? "تم تسجيل الدخول بنجاح."
                  : "Signed in successfully."}
              </p>
            )}

            <p className="mt-8 text-center text-sm text-white/60">
              {content.noAccount}{" "}
              <Link
                to="/signup"
                className="font-semibold text-[#d4af37] underline-offset-2 hover:text-[#e8c85c] hover:underline"
              >
                {content.signup}
              </Link>
            </p>

            <div className="mt-6 text-center">
              <Link
                to="/"
                className="text-sm font-medium text-white/50 transition hover:text-white/80"
              >
                {content.back}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
