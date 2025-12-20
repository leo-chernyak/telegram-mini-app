import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoUrl from '../logo.png';
import { Button } from '../components/Button';
import { Panel, PanelInner } from '../components/Panel';
import { useI18n } from '../i18n/context';
import { apiPost } from '../api/client';
import { copyToClipboard } from '../utils/copy';
import { useToast } from '../components/Toast';

type ReferralResp = { ok: true; url: string };

function isTelegramWebApp() {
  return Boolean(window.Telegram?.WebApp);
}

export function Landing() {
  const nav = useNavigate();
  const toast = useToast();
  const { t } = useI18n();
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
    <div className="stack">
      <section className="hero">
        <Panel className="heroPanel">
          <PanelInner>
            <div style={{ display: 'grid', placeItems: 'center', textAlign: 'center' }}>
              <div
                style={{
                  width: 220,
                  height: 220,
                  borderRadius: 40,
                  border: '1px solid var(--stroke)',
                  background: 'rgba(255,255,255,0.02)',
                  display: 'grid',
                  placeItems: 'center',
                  overflow: 'hidden',
                  marginBottom: 14
                }}
              >
                <img
                  src={logoUrl}
                  alt="Tuman"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    padding: 0,
                    opacity: 0.92
                  }}
                />
              </div>

              <div className="kicker">{t('landingTagline')}</div>
              <h1 className="h0" style={{ marginTop: 10 }}>
                {t('landingTitle')}
              </h1>
              <p className="text" style={{ marginTop: 10, maxWidth: 520 }}>
                {t('landingDesc')}
              </p>

              <div className="stack" style={{ width: '100%', maxWidth: 520, marginTop: 16 }}>
                <Button variant="primary" onClick={() => nav('/pay')}>
                  {t('ctaPay')}
                </Button>
                <Button variant="secondary" onClick={() => nav('/account')}>
                  {t('headerAccount')}
                </Button>
                <Button variant="secondary" disabled={!canCopy} loading={copyLoading} onClick={onCopyReferral}>
                  {t('headerCopyReferral')}
                </Button>
                <Button variant="tertiary" onClick={() => nav('/support')}>
                  {t('headerSupport')}
                </Button>
              </div>
            </div>
          </PanelInner>
        </Panel>
      </section>
    </div>
  );
}


