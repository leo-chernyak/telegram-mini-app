import React from 'react';
import { Panel, PanelInner } from '../../components/Panel';
import { useI18n } from '../../i18n/context';

export function DocPrivacy() {
  const { t } = useI18n();
  return (
    <div className="stack">
      <Panel>
        <PanelInner>
          <h1 className="title">{t('docPrivacy')}</h1>
          <p className="text">Короткая версия. Полный текст будет добавлен в продакшене.</p>
          <div className="divider" />
          <div className="stack" style={{ gap: 12, maxWidth: 720 }}>
            <section id="data">
              <p className="title" style={{ fontSize: 18 }}>
                1. Какие данные мы получаем
              </p>
              <p className="text">
                В рамках Mini App Telegram передаёт данные пользователя и подпись. Мы используем их для авторизации и
                статуса подписки.
              </p>
            </section>
            <section id="security">
              <p className="title" style={{ fontSize: 18 }}>
                2. Безопасность
              </p>
              <p className="text">
                Мы проверяем подпись `initData` по алгоритму Telegram. Доверие — только по криптографической подписи.
              </p>
            </section>
            <section id="retention">
              <p className="title" style={{ fontSize: 18 }}>
                3. Хранение
              </p>
              <p className="text">
                В MVP подписка хранится в памяти сервера. В продакшене будет использована база данных с ограниченным
                доступом.
              </p>
            </section>
          </div>
        </PanelInner>
      </Panel>
    </div>
  );
}


