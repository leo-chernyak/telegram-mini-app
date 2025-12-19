# Tuman (MVP)

Telegram-бот + Telegram Mini App (WebApp) для оплаты VPN-подписки.

## Требования
- Node.js 20+
- pnpm (через corepack)

## Структура
- `bot-server/` — Express + Telegraf, API + раздача статики miniapp в prod
- `miniapp/` — Vite + React + TypeScript, hash routing (`#/pay`, `#/status`, …)

## ENV
Создайте `.env` (можно скопировать из `env.example`) или экспортируйте переменные окружения:

- `BOT_TOKEN` — токен бота
- `PAYMENTS_PROVIDER_TOKEN` — provider token Telegram Payments
- `BOT_USERNAME` — username бота (без `@`)
- `PORT` — порт backend (по умолчанию `3000`)
- `MINIAPP_URL` — URL miniapp для кнопок бота (dev: `http://localhost:5173`)
- `MINIAPP_ORIGIN` — origin для CORS (dev: `http://localhost:5173`)

## Запуск (dev)

```bash
corepack enable
pnpm install
pnpm dev
```

- `miniapp` поднимается на `http://localhost:5173`
- `bot-server` поднимается на `http://localhost:3000`

## Build (prod)

```bash
pnpm build
pnpm --filter bot-server build
pnpm --filter bot-server start
```

Сборка miniapp копируется в `bot-server/public-miniapp` и раздаётся backend-ом.

## Docker

```bash
docker compose build
docker compose up
```


