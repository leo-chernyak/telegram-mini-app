import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useI18n, useSetLang } from '../i18n/context';

export function TopBar() {
  const nav = useNavigate();
  const loc = useLocation();
  const { lang } = useI18n();
  const setLang = useSetLang();

  const isLanding = loc.pathname === '/';

  return (
    <div className="header">
      <div className="topLeft">
        {!isLanding ? (
          <button className="backBtn" type="button" onClick={() => nav(-1)}>
            Назад
          </button>
        ) : (
          <span />
        )}
      </div>

      <div className="pill" aria-label="Language">
        <button className="pillBtn" data-active={lang === 'ru'} onClick={() => setLang('ru')} type="button">
          RU
        </button>
        <button className="pillBtn" data-active={lang === 'en'} onClick={() => setLang('en')} type="button">
          EN
        </button>
      </div>
    </div>
  );
}


