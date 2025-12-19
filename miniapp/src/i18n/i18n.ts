export type Lang = 'ru' | 'en';

type Dict = Record<string, string>;

const RU: Dict = {
  appTitle: 'Tuman',
  welcomeTitle: 'Tuman',
  welcomeText: 'Оплатите подписку или проверьте статус — спокойно и без лишних шагов.',
  pay: 'Оплатить',
  checkStatus: 'Проверить статус',
  choosePlan: 'Выберите тариф',
  month: 'Месяц',
  year: 'Год',
  monthPrice: '199 ₽',
  yearPrice: '1990 ₽',
  docsAck: 'Я ознакомился с документами',
  openDocs: 'Документы',
  payWithTelegram: 'Оплатить через Telegram',
  paymentSuccessTitle: 'Оплата прошла',
  paymentSuccessHint: "Вернитесь в приложение и нажмите 'Активировать'.",
  statusTitle: 'Статус подписки',
  statusActive: 'active',
  statusInactive: 'inactive',
  statusExpired: 'expired',
  expiresAt: 'Дата окончания',
  renew: 'Продлить',
  inviteTitle: 'Пригласить друга',
  copy: 'Скопировать',
  inviteHint: 'Когда друг установит приложение и активирует подписку — вам начислится бонус.',
  docsTitle: 'Документы',
  loading: 'Загрузка…',
  copied: 'Скопировано',
  invoiceFailed: 'Не удалось открыть оплату',
  requestFailed: 'Ошибка запроса'
};

const EN: Dict = {
  appTitle: 'Tuman',
  welcomeTitle: 'Tuman',
  welcomeText: 'Pay for a subscription or check status — calm and simple.',
  pay: 'Pay',
  checkStatus: 'Check status',
  choosePlan: 'Choose a plan',
  month: 'Month',
  year: 'Year',
  monthPrice: '199 RUB',
  yearPrice: '1990 RUB',
  docsAck: 'I have read the documents',
  openDocs: 'Documents',
  payWithTelegram: 'Pay via Telegram',
  paymentSuccessTitle: 'Payment successful',
  paymentSuccessHint: "Go back to the app and tap 'Activate'.",
  statusTitle: 'Subscription status',
  statusActive: 'active',
  statusInactive: 'inactive',
  statusExpired: 'expired',
  expiresAt: 'Expires at',
  renew: 'Renew',
  inviteTitle: 'Invite a friend',
  copy: 'Copy',
  inviteHint: 'When your friend activates a subscription, you will get a bonus.',
  docsTitle: 'Documents',
  loading: 'Loading…',
  copied: 'Copied',
  invoiceFailed: 'Failed to open payment',
  requestFailed: 'Request failed'
};

export function detectLang(): Lang {
  const code = String(window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code ?? '').toLowerCase();
  if (code.startsWith('en')) return 'en';
  return 'ru';
}

export function createI18n(lang: Lang) {
  const dict = lang === 'en' ? EN : RU;
  const t = (key: keyof typeof RU) => dict[String(key)] ?? RU[String(key)] ?? String(key);
  return { lang, t };
}


