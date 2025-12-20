import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../api/client';
import { Button } from '../components/Button';
import { Loader } from '../components/Loader';
import { Panel, PanelInner } from '../components/Panel';
import { useToast } from '../components/Toast';
import { useI18n } from '../i18n/context';

type StatusResp = {
  ok: true;
  status: 'active' | 'inactive' | 'expired';
  plan: 'month' | 'year' | null;
  expiresAt: number | null;
};

function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString();
}

export function Account() {
  const nav = useNavigate();
  const toast = useToast();
  const { t } = useI18n();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<StatusResp | null>(null);

  const userId = useMemo(() => {
    const raw = window.Telegram?.WebApp?.initDataUnsafe?.user?.id;
    if (!raw) return null;
    const n = Number(raw);
    return Number.isFinite(n) ? n : null;
  }, []);

  useEffect(() => {
    setLoading(true);
    apiPost<StatusResp>('/api/subscription/status', {})
      .then((r) => setData(r))
      .catch((e) => toast.error((e as Error).message || t('requestFailed')))
      .finally(() => setLoading(false));
  }, [t, toast]);

  const expires = useMemo(() => {
    if (!data?.expiresAt) return '—';
    return formatDate(data.expiresAt);
  }, [data?.expiresAt]);

  function close() {
    window.Telegram?.WebApp?.close?.();
  }

  return (
    <div className="stack">
      <Panel>
        <PanelInner>
          <h1 className="title">{t('accountTitle')}</h1>
          <p className="text">{t('accountSub')}</p>
        </PanelInner>
      </Panel>

      <Panel>
        <PanelInner>
          <div className="stack" style={{ gap: 10 }}>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <span className="small">Telegram ID</span>
              <span className="mono">{userId ?? '—'}</span>
            </div>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <span className="small">status</span>
              <span className="mono">{data?.status ?? '—'}</span>
            </div>
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <span className="small">{t('expiresAt')}</span>
              <span className="mono">{expires}</span>
            </div>
            <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
              <Button variant="primary" onClick={() => nav('/pay')}>
                {t('ctaPay')}
              </Button>
              <Button variant="secondary" onClick={() => nav('/status')}>
                {t('checkStatus')}
              </Button>
              <Button variant="tertiary" onClick={close}>
                {t('close')}
              </Button>
            </div>
          </div>
        </PanelInner>
      </Panel>

      <Loader visible={loading} />
    </div>
  );
}


