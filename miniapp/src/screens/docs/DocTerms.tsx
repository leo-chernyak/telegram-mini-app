import React from 'react';
import { Panel, PanelInner } from '../../components/Panel';
import { useI18n } from '../../i18n/context';

export function DocTerms() {
  const { t } = useI18n();
  return (
    <div className="stack">
      <Panel>
        <PanelInner>
          <h1 className="title">{t('docTerms')}</h1>
          <p className="text">Короткая версия. Полный текст будет добавлен в продакшене.</p>
          <div className="divider" />
          <div className="stack" style={{ gap: 12, maxWidth: 720 }}>
            <section id="scope">
              <p className="title" style={{ fontSize: 18 }}>
                1. Предмет
              </p>
              <p className="text">
                Этот документ описывает условия использования сервиса Tuman. Используя сервис, вы соглашаетесь с
                условиями.
              </p>
            </section>
            <section id="payments">
              <p className="title" style={{ fontSize: 18 }}>
                2. Оплата и подписка
              </p>
              <p className="text">
                Оплата выполняется через Telegram Payments. Статус подписки зависит от успешного платежа и может
                обновляться с задержкой.
              </p>
            </section>
            <section id="limits">
              <p className="title" style={{ fontSize: 18 }}>
                3. Ограничения
              </p>
              <p className="text">
                Сервис предоставляется «как есть». Мы не гарантируем бесперебойную работу в любых сетях и на любых
                устройствах.
              </p>
            </section>
          </div>
        </PanelInner>
      </Panel>
    </div>
  );
}


