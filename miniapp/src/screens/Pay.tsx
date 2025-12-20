import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../api/client';
import { Loader } from '../components/Loader';
import { Button } from '../components/Button';
import { Panel, PanelInner } from '../components/Panel';
import { useToast } from '../components/Toast';
import { useI18n } from '../i18n/context';

type Plan = 'month' | 'year';

type InvoiceCreateResp = { ok: true; invoiceLink: string };

function hasTelegramMainButton() {
  return Boolean(window.Telegram?.WebApp?.MainButton);
}

export function Pay() {
  const nav = useNavigate();
  const toast = useToast();
  const { t } = useI18n();

  const [plan, setPlan] = useState<Plan>('month');
  const [docsOk, setDocsOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const mainCtaText = useMemo(() => t('payWithTelegram'), [t]);
  const canPay = docsOk && !loading;

  const doPay = useCallback(async () => {
    if (!docsOk) return;
    setLoading(true);
    try {
      const { invoiceLink } = await apiPost<InvoiceCreateResp>('/api/invoice/create', { plan });
      const tg = window.Telegram?.WebApp;
      if (tg?.openInvoice) {
        tg.openInvoice(invoiceLink, (status) => {
          setLoading(false);
          if (status === 'paid') nav('/success');
          if (status === 'failed') toast.show(t('invoiceFailed'));
        });
      } else {
        // Dev fallback (outside Telegram)
        window.open(invoiceLink, '_blank');
        setLoading(false);
        nav('/success');
      }
    } catch (e) {
      setLoading(false);
      toast.show((e as Error).message || t('requestFailed'));
    }
  }, [docsOk, nav, plan, t, toast]);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg?.MainButton) return;

    const mb = tg.MainButton;
    mb.setText(mainCtaText);
    mb.show();
    if (canPay) mb.enable();
    else mb.disable();

    mb.onClick(doPay);
    return () => {
      mb.offClick(doPay);
      mb.hide();
    };
  }, [canPay, doPay, mainCtaText]);

  return (
    <div className="stack">
      <Panel>
        <PanelInner>
          <h1 className="title">{t('choosePlan')}</h1>

          <div className="stack" style={{ gap: 10 }}>
            <div className="choice" data-active={plan === 'month'} onClick={() => setPlan('month')} role="button" tabIndex={0}>
              <div style={{ flex: 1 }}>
                <p className="choiceTitle">
                  {t('month')} — {t('monthPrice')}
                </p>
                <p className="choiceSubtitle">30 дней</p>
              </div>
            </div>

            <div className="choice" data-active={plan === 'year'} onClick={() => setPlan('year')} role="button" tabIndex={0}>
              <div style={{ flex: 1 }}>
                <p className="choiceTitle">
                  {t('year')} — {t('yearPrice')}
                </p>
                <p className="choiceSubtitle">365 дней</p>
              </div>
            </div>
          </div>

          <div className="divider" />

          <label className="row" style={{ alignItems: 'flex-start' }}>
            <input
              type="checkbox"
              checked={docsOk}
              onChange={(e) => setDocsOk(e.target.checked)}
              style={{ marginTop: 3 }}
            />
            <span className="small">{t('docsAck')}</span>
          </label>

          <div className="row" style={{ justifyContent: 'space-between' }}>
            <a href="#/docs">{t('openDocs')}</a>
            <span />
          </div>

          {!hasTelegramMainButton() ? (
            <div style={{ marginTop: 12 }}>
              <Button variant="primary" disabled={!docsOk || loading} loading={loading} onClick={doPay}>
                {t('payWithTelegram')}
              </Button>
            </div>
          ) : (
            <p className="small" style={{ marginTop: 10 }}>
              {t('payWithTelegram')}
            </p>
          )}

          <div style={{ marginTop: 10 }}>
            <Button variant="secondary" onClick={() => nav('/status')}>
              {t('checkStatus')}
            </Button>
          </div>
        </PanelInner>
      </Panel>

      <Loader visible={loading} />
    </div>
  );
}


