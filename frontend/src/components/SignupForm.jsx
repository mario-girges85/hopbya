import React from "react";
import { Link } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import signupImage from "../assets/signup.png";

const SignupForm = ({
  content,
  formData,
  errors,
  submitAttempted,
  isSubmitting,
  submitStatus,
  submitErrorMessage,
  onSubmit,
  onInputChange,
  onPhoneChange,
  getErrorMessage,
}) => {
  const showFieldError = (fieldName) => submitAttempted && errors[fieldName];

  const inputClass =
    "w-full rounded-lg border border-(--color-border)/35 bg-white px-4 py-3 text-sm text-(--color-primary-text) outline-none transition placeholder:text-(--color-secondary-text)/60 focus:border-(--color-accent-blue) focus:ring-2 focus:ring-(--color-soft-blue)";
  const phoneWrapperClass =
    "[direction:ltr] rounded-lg border border-(--color-border)/35 bg-white px-4 py-3 transition focus-within:border-(--color-accent-blue) focus-within:ring-2 focus-within:ring-(--color-soft-blue)";
  const phoneInputClass =
    "w-full bg-transparent text-sm text-(--color-primary-text) outline-none";

  return (
    <div className="mx-auto w-full max-w-6xl rounded-3xl bg-linear-to-br from-(--color-main) via-white to-(--color-soft-teal)/40 p-4 shadow-sm sm:p-6 md:p-8">
      <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-2xl border border-(--color-border)/25 bg-white shadow-md lg:sticky lg:top-24">
            <img
              src={signupImage}
              alt=""
              className="aspect-4/3 w-full object-cover object-[center_22%] sm:aspect-3/2 lg:aspect-3/4 lg:max-h-[min(720px,calc(100dvh-10rem))] lg:min-h-[420px]"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-(--color-border)/20 bg-white/90 p-5 shadow-md backdrop-blur-sm sm:p-7 lg:col-span-7">
          <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
            <div>
              <input
                name="firstName"
                placeholder={content.firstName}
                value={formData.firstName}
                onChange={onInputChange}
                className={inputClass}
              />
              {showFieldError("firstName") && (
                <p className="mt-1 text-xs text-red-600">
                  {getErrorMessage(errors.firstName)}
                </p>
              )}
            </div>
            <div>
              <input
                name="lastName"
                placeholder={content.lastName}
                value={formData.lastName}
                onChange={onInputChange}
                className={inputClass}
              />
              {showFieldError("lastName") && (
                <p className="mt-1 text-xs text-red-600">
                  {getErrorMessage(errors.lastName)}
                </p>
              )}
            </div>
            <div>
              <PhoneInput
                defaultCountry="EG"
                international={false}
                countryCallingCodeEditable={false}
                placeholder={content.phone}
                value={formData.phone}
                onChange={(value) => onPhoneChange("phone", value)}
                className={phoneWrapperClass}
                numberInputProps={{ className: phoneInputClass }}
              />
              {showFieldError("phone") && (
                <p className="mt-1 text-xs text-red-600">
                  {getErrorMessage(errors.phone)}
                </p>
              )}
            </div>
            <div>
              <PhoneInput
                defaultCountry="EG"
                international={false}
                countryCallingCodeEditable={false}
                placeholder={content.whatsapp}
                value={formData.whatsapp}
                onChange={(value) => onPhoneChange("whatsapp", value)}
                className={phoneWrapperClass}
                numberInputProps={{ className: phoneInputClass }}
              />
              {showFieldError("whatsapp") && (
                <p className="mt-1 text-xs text-red-600">
                  {getErrorMessage(errors.whatsapp)}
                </p>
              )}
            </div>
            <div>
              <input
                name="email"
                type="email"
                placeholder={content.email}
                value={formData.email}
                onChange={onInputChange}
                className={inputClass}
              />
              {showFieldError("email") && (
                <p className="mt-1 text-xs text-red-600">
                  {getErrorMessage(errors.email)}
                </p>
              )}
            </div>
            <div>
              <input
                name="birthday"
                type="date"
                value={formData.birthday}
                onChange={onInputChange}
                className={inputClass}
              />
              {showFieldError("birthday") && (
                <p className="mt-1 text-xs text-red-600">
                  {getErrorMessage(errors.birthday)}
                </p>
              )}
            </div>
            <div>
              <input
                name="password"
                type="password"
                placeholder={content.password}
                value={formData.password}
                onChange={onInputChange}
                className={inputClass}
              />
              {showFieldError("password") && (
                <p className="mt-1 text-xs text-red-600">
                  {getErrorMessage(errors.password)}
                </p>
              )}
            </div>
            <div>
              <input
                name="confirmPassword"
                type="password"
                placeholder={content.confirmPassword}
                value={formData.confirmPassword}
                onChange={onInputChange}
                className={inputClass}
              />
              {showFieldError("confirmPassword") && (
                <p className="mt-1 text-xs text-red-600">
                  {getErrorMessage(errors.confirmPassword)}
                </p>
              )}
            </div>
            <div>
              <select
                name="gender"
                value={formData.gender}
                onChange={onInputChange}
                className={inputClass}
              >
                <option value="">{content.gender}</option>
                <option value="male">{content.male}</option>
                <option value="female">{content.female}</option>
              </select>
              {showFieldError("gender") && (
                <p className="mt-1 text-xs text-red-600">
                  {getErrorMessage(errors.gender)}
                </p>
              )}
            </div>
            <div>
              <input
                name="education"
                placeholder={content.education}
                value={formData.education}
                onChange={onInputChange}
                className={inputClass}
              />
              {showFieldError("education") && (
                <p className="mt-1 text-xs text-red-600">
                  {getErrorMessage(errors.education)}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <input
                name="address"
                placeholder={content.address}
                value={formData.address}
                onChange={onInputChange}
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2 rounded-xl border border-(--color-border)/30 bg-(--color-soft-blue)/50 p-4">
              <p className="mb-3 text-sm font-semibold text-(--color-primary-text)">
                {content.level}
              </p>
              <div className="flex flex-wrap gap-5">
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-(--color-secondary-text)">
                  <input
                    type="radio"
                    name="level"
                    value="undergrad"
                    checked={formData.level === "undergrad"}
                    onChange={onInputChange}
                    className="size-4 accent-(--color-accent-blue)"
                  />
                  {content.undergrad}
                </label>
                <label className="flex cursor-pointer items-center gap-2.5 text-sm text-(--color-secondary-text)">
                  <input
                    type="radio"
                    name="level"
                    value="grad"
                    checked={formData.level === "grad"}
                    onChange={onInputChange}
                    className="size-4 accent-(--color-accent-blue)"
                  />
                  {content.grad}
                </label>
              </div>
              {showFieldError("level") && (
                <p className="mt-2 text-xs text-red-600">
                  {getErrorMessage(errors.level)}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3 pt-1 sm:col-span-2 sm:flex-row sm:flex-wrap">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-full bg-(--color-accent-blue) px-8 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-(--color-accent-teal) disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {isSubmitting ? content.submitting : content.submit}
              </button>
              <Link
                to="/"
                className="w-full rounded-full border border-(--color-border) bg-(--color-soft-orange) px-8 py-3 text-center text-sm font-semibold text-(--color-primary-text) transition hover:bg-(--color-main) sm:w-auto"
              >
                {content.back}
              </Link>
            </div>

            {submitStatus === "success" && (
              <p className="sm:col-span-2 text-sm font-medium text-green-700">
                {content.submitSuccess}
              </p>
            )}
            {submitStatus === "error" && (
              <p className="sm:col-span-2 text-sm font-medium text-red-700">
                {submitErrorMessage || content.submitError}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
