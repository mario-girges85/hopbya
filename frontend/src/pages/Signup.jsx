import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/SignupForm.jsx";
import showAccountExistsAlert from "../components/AccountExistsAlert.jsx";
import showSignupSuccessAlert from "../components/SignupSuccessAlert.jsx";
import { getSignupValidationErrors } from "../utils/signupValidation.js";

const signupCopy = {
  ar: {
    title: "إنشاء حساب جديد",
    subtitle: "املأ البيانات التالية للبدء.",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    phone: "رقم الهاتف",
    whatsapp: "رقم واتساب",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirmPassword: "تأكيد كلمة المرور",
    birthday: "تاريخ الميلاد",
    gender: "النوع",
    education: "المؤهل الدراسي",
    address: "العنوان",
    level: "الحالة الدراسية",
    male: "ذكر",
    female: "أنثى",
    undergrad: "طالب جامعي",
    grad: "خريج",
    submit: "إنشاء الحساب",
    back: "العودة للرئيسية",
    goToLogin: "الذهاب لتسجيل الدخول",
    stayOnSignup: "البقاء في إنشاء الحساب",
    required: "هذا الحقل مطلوب",
    passwordMismatch: "كلمتا المرور غير متطابقتين",
    submitting: "جاري إرسال البيانات...",
    submitSuccess: "تم إرسال البيانات بنجاح.",
    submitError: "حدث خطأ أثناء الإرسال. حاول مرة أخرى.",
    emailExists: "البريد الإلكتروني مستخدم بالفعل.",
    phoneExists: "رقم الهاتف مستخدم بالفعل.",
    invalidEmail: "صيغة البريد الإلكتروني غير صحيحة.",
    allFieldsRequired: "يرجى إدخال جميع الحقول المطلوبة.",
  },
  en: {
    title: "Create New Account",
    subtitle: "Fill in the details below to get started.",
    firstName: "First Name",
    lastName: "Last Name",
    phone: "Phone Number",
    whatsapp: "WhatsApp Number",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    birthday: "Birthday",
    gender: "Gender",
    education: "Education",
    address: "Address",
    level: "Status",
    male: "Male",
    female: "Female",

    undergrad: "Undergrad",
    grad: "Graduate",
    submit: "Create Account",
    back: "Back to Home",
    goToLogin: "Go to Login",
    stayOnSignup: "Stay on Signup",
    required: "This field is required",
    passwordMismatch: "Passwords do not match",
    submitting: "Submitting data...",
    submitSuccess: "Account created successfully.",
    submitError: "Something went wrong while submitting. Please try again.",
    emailExists: "Email already exists.",
    phoneExists: "Phone number already exists.",
    invalidEmail: "Invalid email format.",
    allFieldsRequired: "Please fill in all required fields.",
  },
};

const Signup = ({ language = "ar" }) => {
  const navigate = useNavigate();
  const content = signupCopy[language];
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    whatsapp: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: "",
    gender: "",
    education: "",
    address: "",
    level: "undergrad",
  });
  const [errors, setErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [submitErrorKey, setSubmitErrorKey] = useState("");

  const getErrorMessage = (errorKey) => {
    const errorMessages = {
      required: content.required,
      passwordMismatch: content.passwordMismatch,
      emailExists: content.emailExists,
      phoneExists: content.phoneExists,
      invalidEmail: content.invalidEmail,
    };
    return errorMessages[errorKey] ?? content.required;
  };

  const updateFieldValue = (fieldName, value) => {
    setFormData((prev) => {
      const nextValues = { ...prev, [fieldName]: value ?? "" };
      if (submitAttempted) {
        setErrors(getSignupValidationErrors(nextValues));
      }
      return nextValues;
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    updateFieldValue(name, value);
  };

  const getApiBaseUrl = () => {
    const baseUrl = import.meta.env.VITE_DEMO_API_URL?.trim();
    if (!baseUrl) {
      return null;
    }

    return baseUrl.replace(/\/+$/, "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitAttempted(true);
    const formErrors = getSignupValidationErrors(formData);
    setErrors(formErrors);
    setSubmitErrorKey("");

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    const apiBaseUrl = getApiBaseUrl();
    if (!apiBaseUrl) {
      setSubmitStatus("error");
      return;
    }
    const endpoint = `${apiBaseUrl}/api/user/signup`;

    try {
      setIsSubmitting(true);
      setSubmitStatus("idle");
      setSubmitErrorKey("");

      const { confirmPassword, level, ...restPayload } = formData;
      const payload = { ...restPayload, edu_status: level };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let responseMessage = "";
        try {
          const errorData = await response.json();
          responseMessage = errorData?.message ?? "";
        } catch {
          responseMessage = "";
        }

        if (responseMessage === "Email already exists") {
          setErrors((prev) => ({ ...prev, email: "emailExists" }));
          setSubmitErrorKey("emailExists");
          const goToLogin = await showAccountExistsAlert({
            message: content.emailExists,
            loginButtonText: content.goToLogin,
            stayButtonText: content.stayOnSignup,
          });
          if (goToLogin) {
            navigate("/login");
          }
          return;
        } else if (responseMessage === "Phone already exists") {
          setErrors((prev) => ({ ...prev, phone: "phoneExists" }));
          setSubmitErrorKey("phoneExists");
          const goToLogin = await showAccountExistsAlert({
            message: content.phoneExists,
            loginButtonText: content.goToLogin,
            stayButtonText: content.stayOnSignup,
          });
          if (goToLogin) {
            navigate("/login");
          }
          return;
        } else if (responseMessage === "Invalid email format") {
          setErrors((prev) => ({ ...prev, email: "invalidEmail" }));
          setSubmitErrorKey("invalidEmail");
        } else if (responseMessage === "All fields are required") {
          setSubmitErrorKey("allFieldsRequired");
        } else {
          setSubmitErrorKey("submitError");
        }

        throw new Error(responseMessage || "Request failed");
      }

      setSubmitStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        whatsapp: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthday: "",
        gender: "",
        education: "",
        address: "",
        level: "undergrad",
      });
      setErrors({});
      setSubmitAttempted(false);
      setSubmitErrorKey("");
      await showSignupSuccessAlert();
      navigate("/login");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full px-4 py-10 sm:px-6 md:py-14 lg:px-8">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-(--color-primary-text) sm:text-3xl">
          {content.title}
        </h2>
        <p className="mt-2 text-sm text-(--color-secondary-text) sm:text-base">
          {content.subtitle}
        </p>
      </div>

      <SignupForm
        content={content}
        formData={formData}
        errors={errors}
        submitAttempted={submitAttempted}
        isSubmitting={isSubmitting}
        submitStatus={submitStatus}
        submitErrorMessage={content[submitErrorKey] ?? content.submitError}
        onSubmit={handleSubmit}
        onInputChange={handleChange}
        onPhoneChange={updateFieldValue}
        getErrorMessage={getErrorMessage}
      />
    </section>
  );
};

export default Signup;
