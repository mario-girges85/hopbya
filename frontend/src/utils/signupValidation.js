const REQUIRED_FIELDS = [
  "firstName",
  "lastName",
  "phone",
  "whatsapp",
  "email",
  "password",
  "confirmPassword",
  "birthday",
  "gender",
  "education",
  "level",
];

export const getSignupValidationErrors = (values) => {
  const nextErrors = {};

  REQUIRED_FIELDS.forEach((field) => {
    if (!values[field]?.trim?.() && typeof values[field] === "string") {
      nextErrors[field] = "required";
    } else if (!values[field]) {
      nextErrors[field] = "required";
    }
  });

  if (
    values.password &&
    values.confirmPassword &&
    values.password !== values.confirmPassword
  ) {
    nextErrors.confirmPassword = "passwordMismatch";
  }

  return nextErrors;
};
