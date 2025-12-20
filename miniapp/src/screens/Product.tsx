import React from 'react';
import { Panel, PanelInner } from '../components/Panel';
import { useI18n } from '../i18n/context';

export function Product() {
  const { t } = useI18n();

  const items = [
    { title: 'Оплата', text: 'Официальные платежи Telegram. Прозрачно и привычно.' },
    { title: 'Статус', text: 'Видите активна ли подписка и когда заканчивается.' },
    { title: 'Рефералы', text: 'Ссылка готова за секунду. Делитесь — бонус начислится после активации.' },
    { title: 'Документы', text: 'Короткие и читабельные. Без лишнего шума.' },
    { title: 'Спокойный дизайн', text: 'Ничего не прыгает, ничего не кричит. Всё на месте.' }
  ];

  return (
    <div className="stack">
      <Panel>
        <PanelInner>
          <h1 className="title">{t('openProduct')}</h1>
          <p className="text">Tuman — это управление подпиской без перегрузки.</p>
        </PanelInner>
      </Panel>

      <div className="stack" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
        {items.map((it) => (
          <Panel key={it.title}>
            <PanelInner>
              <p className="title" style={{ fontSize: 18 }}>
                {it.title}
              </p>
              <p className="text">{it.text}</p>
            </PanelInner>
          </Panel>
        ))}
      </div>
    </div>
  );
}


