import React, { createContext, useContext, useMemo, useState } from 'react';
import { createI18n, detectLang, persistLang, type Lang } from './i18n';

type I18nApi = ReturnType<typeof createI18n>;

const I18nContext = createContext<I18nApi | null>(null);
const SetLangContext = createContext<((lang: Lang) => void) | null>(null);

export function useI18n() {
  const v = useContext(I18nContext);
  if (!v) throw new Error('I18nContext missing');
  return v;
}

export function useSetLang() {
  const v = useContext(SetLangContext);
  if (!v) throw new Error('SetLangContext missing');
  return v;
}

export function I18nProvider(props: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => detectLang() satisfies Lang);
  const i18n = useMemo(() => createI18n(lang), [lang]);

  return (
    <SetLangContext.Provider
      value={(next) => {
        persistLang(next);
        setLang(next);
      }}
    >
      <I18nContext.Provider value={i18n}>{props.children}</I18nContext.Provider>
    </SetLangContext.Provider>
  );
}


