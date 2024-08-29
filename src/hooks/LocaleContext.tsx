// I18nContext.js
import React, { createContext, useContext } from "react";

export type I18nType = {
  locale: string;
  changeLanguage(newLanguage: string): unknown;
  t: (key: string) => string;
};

export const I18nContext = createContext<I18nType | undefined>(undefined);

export const I18nProvider = ({
  i18n,
  children,
}: {
  i18n: I18nType;
  children: React.ReactNode;
}) => <I18nContext.Provider value={i18n}>{children}</I18nContext.Provider>;

export const useI18n = () => {
  const i18n = useContext(I18nContext);
  if (i18n === undefined) {
    throw new Error("I18nContext must be used within an I18nProvider");
  }
  return i18n;
};
