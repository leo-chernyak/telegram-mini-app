import React, { useEffect, useState } from 'react';
import { apiPost } from '../api/client';
import { Loader } from '../components/Loader';
import { PrimaryButton } from '../components/PrimaryButton';
import { useToast } from '../components/Toast';
import { useI18n } from '../app';

type ReferralResp = { ok: true; url: string };

export function Invite() {
  const toast = useToast();
  const { t } = useI18n();

  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    apiPost<ReferralResp>('/api/referral/link', {})
      .then((r) => setUrl(r.url))
      .catch((e) => toast.show((e as Error).message || t('requestFailed')))
      .finally(() => setLoading(false));
  }, [t, toast]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      toast.show(t('copied'));
    } catch {
      try {
        const el = document.createElement('textarea');
        el.value = url;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        el.remove();
        toast.show(t('copied'));
      } catch (e) {
        toast.show((e as Error).message || t('requestFailed'));
      }
    }
  }

  return (
    <div className="stack">
      <div className="card stack">
        <h1 className="title">{t('inviteTitle')}</h1>
        <p className="text">{t('inviteHint')}</p>
        <div className="divider" />
        <div className="mono">{url || '—'}</div>
      </div>

      <PrimaryButton disabled={!url} onClick={copy}>
        {t('copy')}
      </PrimaryButton>

      <Loader visible={loading} />
    </div>
  );
}


