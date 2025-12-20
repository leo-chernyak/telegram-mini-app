import React, { useEffect, useState } from 'react';
import { apiPost } from '../api/client';
import { Loader } from '../components/Loader';
import { Button } from '../components/Button';
import { Panel, PanelInner } from '../components/Panel';
import { useToast } from '../components/Toast';
import { useI18n } from '../i18n/context';
import { copyToClipboard } from '../utils/copy';

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
      await copyToClipboard(url);
      toast.ok(t('copied'));
    } catch (e) {
      toast.error((e as Error).message || t('requestFailed'));
    }
  }

  return (
    <div className="stack">
      <Panel>
        <PanelInner>
          <h1 className="title">{t('inviteTitle')}</h1>
          <p className="text">{t('inviteHint')}</p>
          <div className="divider" />
          <div className="mono">{url || '—'}</div>
          <div style={{ marginTop: 12 }}>
            <Button variant="primary" disabled={!url} onClick={copy}>
              {t('copy')}
            </Button>
          </div>
        </PanelInner>
      </Panel>

      <Loader visible={loading} />
    </div>
  );
}


