const GRAILDAILY_TIMEZONE = "Asia/Jakarta";

export function formatDate(date: Date | null | undefined, locale = "en-US") {
  if (!date) return "-";

  return new Intl.DateTimeFormat(locale, {
    timeZone: GRAILDAILY_TIMEZONE,
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function formatDateTime(
  date: Date | null | undefined,
  locale = "en-US",
) {
  if (!date) return "-";

  return new Intl.DateTimeFormat(locale, {
    timeZone: GRAILDAILY_TIMEZONE,
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}
