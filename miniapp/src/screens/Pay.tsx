import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../api/client';
import { Loader } from '../components/Loader';
import { PrimaryButton } from '../components/PrimaryButton';
import { useToast } from '../components/Toast';
import { useI18n } from '../app';

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
      <div className="card stack">
        <h1 className="title">{t('choosePlan')}</h1>

        <div
          className="radio"
          data-active={plan === 'month'}
          onClick={() => setPlan('month')}
          role="button"
          tabIndex={0}
        >
          <div style={{ flex: 1 }}>
            <p className="radioTitle">
              {t('month')} — {t('monthPrice')}
            </p>
            <p className="radioSubtitle">199 RUB</p>
          </div>
        </div>

        <div
          className="radio"
          data-active={plan === 'year'}
          onClick={() => setPlan('year')}
          role="button"
          tabIndex={0}
        >
          <div style={{ flex: 1 }}>
            <p className="radioTitle">
              {t('year')} — {t('yearPrice')}
            </p>
            <p className="radioSubtitle">1990 RUB</p>
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
        </div>
      </div>

      {!hasTelegramMainButton() ? (
        <PrimaryButton disabled={!docsOk || loading} onClick={doPay}>
          {t('payWithTelegram')}
        </PrimaryButton>
      ) : (
        <div className="small">{t('payWithTelegram')}</div>
      )}

      <Loader visible={loading} />
    </div>
  );
}


