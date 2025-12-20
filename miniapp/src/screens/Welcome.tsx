import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Panel, PanelInner } from '../components/Panel';
import { useI18n } from '../i18n/context';

export function Welcome() {
  const nav = useNavigate();
  const { t } = useI18n();

  return (
    <div className="stack">
      <Panel>
        <PanelInner>
          <h1 className="title">{t('welcomeTitle')}</h1>
          <p className="text">{t('welcomeText')}</p>
        </PanelInner>
      </Panel>

      <div className="row" style={{ gap: 10, flexWrap: 'wrap' }}>
        <Button variant="primary" onClick={() => nav('/pay')}>
          {t('pay')}
        </Button>
        <Button variant="secondary" onClick={() => nav('/status')}>
          {t('checkStatus')}
        </Button>
      </div>
    </div>
  );
}


