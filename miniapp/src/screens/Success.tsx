import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../components/PrimaryButton';
import { useI18n } from '../i18n/context';

export function Success() {
  const nav = useNavigate();
  const { t } = useI18n();

  return (
    <div className="stack">
      <div className="card">
        <h1 className="title">{t('paymentSuccessTitle')}</h1>
        <p className="text">{t('paymentSuccessHint')}</p>
      </div>

      <PrimaryButton onClick={() => nav('/status')}>{t('checkStatus')}</PrimaryButton>
    </div>
  );
}


