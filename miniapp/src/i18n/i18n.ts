export type Lang = 'ru' | 'en';

type Dict = Record<string, string>;

const RU: Dict = {
  appTitle: 'Tuman',
  welcomeTitle: 'Добро пожаловать',
  welcomeText: 'Здесь тишина и контроль. Подписка и статус — в два нажатия.',
  pay: 'Оплатить подписку',
  checkStatus: 'Проверить статус',
  choosePlan: 'Выберите тариф',
  month: 'Месяц',
  year: 'Год',
  monthPrice: '199 ₽',
  yearPrice: '1990 ₽',
  docsAck: 'Я ознакомился с документами',
  openDocs: 'Открыть документы',
  payWithTelegram: 'Оплатить в Telegram',
  paymentSuccessTitle: 'Оплата прошла',
  paymentSuccessHint: "Вернитесь в приложение и нажмите «Активировать».",
  statusTitle: 'Статус подписки',
  statusActive: 'active',
  statusInactive: 'inactive',
  statusExpired: 'expired',
  expiresAt: 'Дата окончания',
  renew: 'Продлить',
  inviteTitle: 'Реферальная ссылка',
  copy: 'Скопировать',
  inviteHint: 'Ссылка готова. Скопируйте и отправьте другу. После активации подписки вам начислится бонус.',
  docsTitle: 'Документы',
  loading: 'Загрузка…',
  copied: 'Ссылка скопирована',
  invoiceFailed: 'Не удалось открыть оплату',
  requestFailed: 'Мы не смогли загрузить данные. Проверьте соединение и попробуйте ещё раз.',
  headerCopyReferral: 'Скопировать реферальную ссылку',
  headerAccount: 'Мой аккаунт',
  headerSupport: 'Поддержка',
  accountTitle: 'Аккаунт',
  accountSub: 'Данные и управление подпиской',
  close: 'Закрыть',
  openProduct: 'Продукт',
  openSupport: 'Поддержка',
  openDocsNav: 'Документы',
  landingTitle: 'Tuman VPN',
  landingTagline: 'Приватность без лишних слов.',
  landingDesc:
    'Оплатите подписку, проверьте статус и поделитесь ссылкой — в одном месте. Данные подтверждаем на сервере. Без перегруженных меню.',
  ctaPay: 'Оформить подписку',
  ctaAccount: 'Открыть аккаунт',
  feature1Title: 'Спокойный интерфейс',
  feature1Text: 'Один экран — одно действие. Никаких лабиринтов.',
  feature2Title: 'Оплата внутри Telegram',
  feature2Text: 'Официальные платежи Telegram. Вы возвращаетесь в приложение вручную — это нормально.',
  feature3Title: 'Проверка данных',
  feature3Text: 'Мы валидируем initData на сервере. Доверие — только по подписи.',
  howTitle: 'Как это работает',
  how1: 'Выбираете тариф и подтверждаете документы.',
  how2: 'Оплачиваете через Telegram Payments.',
  how3: 'Возвращаетесь и проверяете статус. При необходимости продлеваете.',
  trustTitle: 'Про приватность',
  trustText:
    'Мы не просим лишнего. Всё, что нужно для работы, приходит из Telegram и подтверждается подписью.',
  supportTitle: 'Поддержка',
  supportText:
    'Если что-то не работает — опишите ситуацию. Мы ответим спокойно и по делу.',
  docsPageTitle: 'Документы',
  docTerms: 'Условия использования',
  docPrivacy: 'Политика конфиденциальности',
  docPd: 'Политика обработки персональных данных',
  tgMissingTitle: 'Откройте в Telegram',
  tgMissingText: 'Этот интерфейс рассчитан на WebView Telegram. Откройте его через бота, чтобы продолжить.',
  retry: 'Повторить'
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
  requestFailed: 'We could not load data. Check your connection and try again.',
  headerCopyReferral: 'Copy referral link',
  headerAccount: 'My account',
  headerSupport: 'Support',
  accountTitle: 'Account',
  accountSub: 'Details and subscription',
  close: 'Close',
  openProduct: 'Product',
  openSupport: 'Support',
  openDocsNav: 'Documents',
  landingTitle: 'Tuman VPN',
  landingTagline: 'Privacy without noise.',
  landingDesc: 'Pay, check status and share your link — in one place.',
  ctaPay: 'Subscribe',
  ctaAccount: 'Open account',
  feature1Title: 'Calm UI',
  feature1Text: 'One screen — one action.',
  feature2Title: 'Pay inside Telegram',
  feature2Text: 'Telegram Payments. Manual return is expected.',
  feature3Title: 'Data validation',
  feature3Text: 'We validate initData on the server.',
  howTitle: 'How it works',
  how1: 'Choose a plan and accept docs.',
  how2: 'Pay via Telegram Payments.',
  how3: 'Return and check status.',
  trustTitle: 'About privacy',
  trustText: 'We keep it minimal and signed.',
  supportTitle: 'Support',
  supportText: 'Describe the issue and we will help.',
  docsPageTitle: 'Documents',
  docTerms: 'Terms of use',
  docPrivacy: 'Privacy policy',
  docPd: 'Personal data policy',
  tgMissingTitle: 'Open in Telegram',
  tgMissingText: 'This UI is designed for Telegram WebView. Open it from the bot to continue.',
  retry: 'Retry'
};

const LANG_STORAGE_KEY = 'tuman.lang';

export function detectLang(): Lang {
  const stored = String(localStorage.getItem(LANG_STORAGE_KEY) ?? '').toLowerCase();
  if (stored === 'ru' || stored === 'en') return stored as Lang;
  const code = String(window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code ?? '').toLowerCase();
  if (code.startsWith('en')) return 'en';
  return 'ru';
}

export function createI18n(lang: Lang) {
  const dict = lang === 'en' ? EN : RU;
  const t = (key: keyof typeof RU) => dict[String(key)] ?? RU[String(key)] ?? String(key);
  return { lang, t };
}

export function persistLang(lang: Lang) {
  localStorage.setItem(LANG_STORAGE_KEY, lang);
}


