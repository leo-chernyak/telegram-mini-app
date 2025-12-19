import React, { useEffect, useState } from 'react';
import { apiGet } from '../api/client';
import { Loader } from '../components/Loader';
import { useToast } from '../components/Toast';
import { useI18n } from '../app';

type DocItem = { id: string; title: string; url: string };
type DocsResp = { ok: true; docs: DocItem[] };

export function Docs() {
  const toast = useToast();
  const { t } = useI18n();

  const [loading, setLoading] = useState(true);
  const [docs, setDocs] = useState<DocItem[]>([]);

  useEffect(() => {
    setLoading(true);
    apiGet<DocsResp>('/api/docs')
      .then((r) => setDocs(r.docs))
      .catch((e) => toast.show((e as Error).message || t('requestFailed')))
      .finally(() => setLoading(false));
  }, [t, toast]);

  return (
    <div className="stack">
      <div className="card stack">
        <h1 className="title">{t('docsTitle')}</h1>
        <div className="stack" style={{ gap: 10 }}>
          {docs.map((d) => (
            <a key={d.id} href={d.url} target="_blank" rel="noreferrer">
              {d.title}
            </a>
          ))}
        </div>
      </div>
      <Loader visible={loading} />
    </div>
  );
}


