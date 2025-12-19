import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../components/PrimaryButton';
import { useI18n } from '../app';

export function Welcome() {
  const nav = useNavigate();
  const { t } = useI18n();

  return (
    <div className="stack">
      <div className="card">
        <h1 className="title">{t('welcomeTitle')}</h1>
        <p className="text">{t('welcomeText')}</p>
      </div>

      <div className="stack">
        <PrimaryButton onClick={() => nav('/pay')}>{t('pay')}</PrimaryButton>
        <PrimaryButton onClick={() => nav('/status')}>{t('checkStatus')}</PrimaryButton>
      </div>
    </div>
  );
}


