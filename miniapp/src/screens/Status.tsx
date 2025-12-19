import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../api/client';
import { Loader } from '../components/Loader';
import { PrimaryButton } from '../components/PrimaryButton';
import { useToast } from '../components/Toast';
import { useI18n } from '../app';

type StatusResp = {
  ok: true;
  status: 'active' | 'inactive' | 'expired';
  plan: 'month' | 'year' | null;
  expiresAt: number | null;
};

function formatDate(ms: number) {
  const d = new Date(ms);
  return d.toLocaleDateString();
}

export function Status() {
  const nav = useNavigate();
  const toast = useToast();
  const { t } = useI18n();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<StatusResp | null>(null);

  useEffect(() => {
    setLoading(true);
    apiPost<StatusResp>('/api/subscription/status', {})
      .then((r) => setData(r))
      .catch((e) => toast.show((e as Error).message || t('requestFailed')))
      .finally(() => setLoading(false));
  }, [t, toast]);

  const expires = useMemo(() => {
    if (!data?.expiresAt) return '—';
    return formatDate(data.expiresAt);
  }, [data?.expiresAt]);

  return (
    <div className="stack">
      <div className="card stack">
        <h1 className="title">{t('statusTitle')}</h1>
        <div className="stack" style={{ gap: 6 }}>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <span className="small">status</span>
            <span className="mono">{data?.status ?? '—'}</span>
          </div>
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <span className="small">{t('expiresAt')}</span>
            <span className="mono">{expires}</span>
          </div>
        </div>
      </div>

      <PrimaryButton onClick={() => nav('/pay')}>{t('renew')}</PrimaryButton>
      <Loader visible={loading} />
    </div>
  );
}


