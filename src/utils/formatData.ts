/* eslint-disable import/prefer-default-export */
import { formatRelative } from "date-fns";
import { pt } from "date-fns/locale";

const formatRelativeLocaleEn = {
  lastWeek: "dd-MM-yyyy",
  yesterday: "dd-MM-yyyy",
  today: "HH:mm",
  tomorrow: "dd-MM-yyyy",
  nextWeek: "dd-MM-yyyy",
  other: "dd-MM-yyyy",
};

const locale = {
  ...pt,
  formatRelative: (token: string) =>
    formatRelativeLocaleEn[token as keyof typeof formatRelativeLocaleEn],
};

export function formatOnlyDate(date: string) {
  const currentDate = new Date();

  if (!date) {
    return formatRelative(currentDate, currentDate, { locale });
  }

  try {
    const parsedDate = new Date(date);
    const formattedDate = formatRelative(parsedDate, currentDate, { locale });
    return formattedDate.toString();
  } catch {
    return "xx-xx-xxxx";
  }
}
