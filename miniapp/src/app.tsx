import React, { useEffect } from 'react';
import { AppRouter } from './router';
import { ToastProvider, useToast } from './components/Toast';
import { apiPost } from './api/client';
import logoUrl from './logo.png';
import { I18nProvider, useI18n } from './i18n/context';
import { HashRouter } from 'react-router-dom';
import { TopBar } from './components/TopBar';

function AppInner() {
  const toast = useToast();
  const i18n = useI18n();

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
    <div className="appShell">
      <div className="fogLayer" />
      <div className="watermark" style={{ backgroundImage: `url(${logoUrl})` }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <HashRouter>
          <TopBar />
          <AppRouter />
        </HashRouter>
        <footer className="footer">
          <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <span>© Tuman</span>
            <span className="row" style={{ gap: 12 }}>
              <a href="#/docs">{i18n.t('openDocsNav')}</a>
              <a href="#/support">{i18n.t('openSupport')}</a>
              <a href="#/product">{i18n.t('openProduct')}</a>
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export function App() {
  return (
    <ToastProvider>
      <I18nProvider>
        <AppInner />
      </I18nProvider>
    </ToastProvider>
  );
}


