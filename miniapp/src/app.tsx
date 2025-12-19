import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { AppRouter } from './router';
import { ToastProvider, useToast } from './components/Toast';
import { apiPost } from './api/client';
import { createI18n, detectLang, type Lang } from './i18n/i18n';

type I18nApi = ReturnType<typeof createI18n>;
const I18nContext = createContext<I18nApi | null>(null);

export function useI18n() {
  const v = useContext(I18nContext);
  if (!v) throw new Error('I18nContext missing');
  return v;
}

function AppInner() {
  const toast = useToast();

  const i18n = useMemo(() => {
    const lang = detectLang() satisfies Lang;
    return createI18n(lang);
  }, []);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    tg?.ready();
  }, []);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg?.initData) return;
    apiPost<{ ok: true; userId: number }>('/api/auth/validate', {})
      .then(() => {})
      .catch((e) => toast.show(e.message || i18n.t('requestFailed')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <I18nContext.Provider value={i18n}>
      <div className="container">
        <AppRouter />
      </div>
    </I18nContext.Provider>
  );
}

export function App() {
  return (
    <ToastProvider>
      <AppInner />
    </ToastProvider>
  );
}


