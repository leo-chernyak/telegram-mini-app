import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoUrl from '../logo.png';
import { apiPost } from '../api/client';
import { useI18n, useSetLang } from '../i18n/context';
import { Button } from './Button';
import { useToast } from './Toast';
import { copyToClipboard } from '../utils/copy';

type ReferralResp = { ok: true; url: string };

function isTelegramWebApp() {
  return Boolean(window.Telegram?.WebApp);
}

export function Header() {
  const nav = useNavigate();
  const toast = useToast();
  const { t, lang } = useI18n();
  const setLang = useSetLang();

  const [copyLoading, setCopyLoading] = useState(false);

  const canCopy = useMemo(() => isTelegramWebApp(), []);

  async function onCopyReferral() {
    if (!canCopy) return;
    setCopyLoading(true);
    try {
      const res = await apiPost<ReferralResp>('/api/referral/link', {});
      await copyToClipboard(res.url);
      toast.ok(t('copied'));
    } catch (e) {
      toast.error((e as Error).message || t('requestFailed'));
    } finally {
      setCopyLoading(false);
    }
  }

  return (
    <div className="header">
      <div className="brand" onClick={() => nav('/')} role="button" tabIndex={0}>
        <div className="brandLogo">
          <img src={logoUrl} alt="Tuman" style={{ width: 18, height: 18, opacity: 0.92 }} />
        </div>
        <div className="brandText">
          <p className="brandName">Tuman</p>
          <p className="brandTag">VPN</p>
        </div>
      </div>

      <div className="headerRight">
        <Button variant="secondary" disabled={!canCopy} loading={copyLoading} onClick={onCopyReferral}>
          {t('headerCopyReferral')}
        </Button>
        <Button variant="secondary" onClick={() => nav('/account')}>
          {t('headerAccount')}
        </Button>
        <Button variant="tertiary" onClick={() => nav('/support')}>
          {t('headerSupport')}
        </Button>

        <div className="pill" aria-label="Language">
          <button className="pillBtn" data-active={lang === 'ru'} onClick={() => setLang('ru')} type="button">
            RU
          </button>
          <button className="pillBtn" data-active={lang === 'en'} onClick={() => setLang('en')} type="button">
            EN
          </button>
        </div>
      </div>
    </div>
  );
}


