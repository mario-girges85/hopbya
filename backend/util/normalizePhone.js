function normalizePhone(
  input,
  { defaultCountryCode = "20", minLength = 8, maxLength = 15 } = {}
) {
  if (input === null || input === undefined) return null;

  const raw = String(input).trim();
  if (!raw) return null;

  // Keep digits and a leading plus sign only.
  const cleaned = raw.replace(/[^\d+]/g, "");
  if (!cleaned) return null;

  let normalized = "";

  if (cleaned.startsWith("+")) {
    normalized = `+${cleaned.slice(1).replace(/\D/g, "")}`;
  } else if (cleaned.startsWith("00")) {
    normalized = `+${cleaned.slice(2).replace(/\D/g, "")}`;
  } else {
    const localDigits = cleaned.replace(/\D/g, "");
    if (!localDigits) return null;

    // If the value is local format like 01xxxxxxxxx, remove the trunk "0".
    const numberWithoutTrunk = localDigits.startsWith("0")
      ? localDigits.slice(1)
      : localDigits;

    normalized = `+${defaultCountryCode}${numberWithoutTrunk}`;
  }

  const digits = normalized.slice(1);
  if (!/^\d+$/.test(digits)) return null;
  if (digits.length < minLength || digits.length > maxLength) return null;

  return normalized;
}

module.exports = normalizePhone;
