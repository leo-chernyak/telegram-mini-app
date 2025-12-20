import React, { useMemo, useState } from 'react';
import { Panel, PanelInner } from '../components/Panel';
import { Button } from '../components/Button';
import { TextArea } from '../components/Input';
import { useToast } from '../components/Toast';
import { useI18n } from '../i18n/context';
import { copyToClipboard } from '../utils/copy';

export function Support() {
  const { t } = useI18n();
  const toast = useToast();
  const [text, setText] = useState('');

  const template = useMemo(() => {
    const tg = Boolean(window.Telegram?.WebApp);
    return [
      'Опишите проблему:',
      '',
      '— что вы хотели сделать',
      '— что произошло',
      '— когда это случилось',
      '',
      `Открыто в Telegram: ${tg ? 'да' : 'нет'}`
    ].join('\n');
  }, []);

  function fillTemplate() {
    if (!text) setText(template);
  }

  async function copyMessage() {
    try {
      await copyToClipboard(text || template);
      toast.ok('Текст скопирован. Вставьте его в чат поддержки.');
    } catch (e) {
      toast.error((e as Error).message || t('requestFailed'));
    }
  }

  return (
    <div className="stack">
      <Panel>
        <PanelInner>
          <h1 className="title">{t('supportTitle')}</h1>
          <p className="text">{t('supportText')}</p>
        </PanelInner>
      </Panel>

      <Panel>
        <PanelInner>
          <div className="stack" style={{ gap: 10 }}>
            <TextArea value={text} onChange={setText} placeholder={template} />
            <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
              <Button variant="secondary" onClick={fillTemplate}>
                Подставить шаблон
              </Button>
              <Button variant="primary" onClick={copyMessage}>
                Скопировать текст для поддержки
              </Button>
            </div>
            <p className="small">
              Откройте чат поддержки в Telegram и вставьте текст. Мы ответим, как только увидим сообщение.
            </p>
          </div>
        </PanelInner>
      </Panel>
    </div>
  );
}


