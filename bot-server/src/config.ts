export type Env = {
  BOT_TOKEN: string;
  PAYMENTS_PROVIDER_TOKEN: string;
  BOT_USERNAME: string;
  PORT: number;
  MINIAPP_URL: string;
  MINIAPP_ORIGIN: string;
  WEBHOOK_URL?: string;
  WEBHOOK_PATH: string;
};

function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env ${name}`);
  return v;
}

export function loadConfig(): Env {
  const PORT = Number(process.env.PORT ?? '3000');
  if (!Number.isFinite(PORT)) throw new Error('Invalid env PORT');

  const MINIAPP_URL = process.env.MINIAPP_URL ?? `http://localhost:5173`;
  const MINIAPP_ORIGIN = process.env.MINIAPP_ORIGIN ?? `http://localhost:5173`;

  const WEBHOOK_URL = process.env.WEBHOOK_URL;
  const WEBHOOK_PATH = process.env.WEBHOOK_PATH ?? '/telegram/webhook';

  return {
    BOT_TOKEN: required('BOT_TOKEN'),
    PAYMENTS_PROVIDER_TOKEN: required('PAYMENTS_PROVIDER_TOKEN'),
    BOT_USERNAME: required('BOT_USERNAME'),
    PORT,
    MINIAPP_URL,
    MINIAPP_ORIGIN,
    WEBHOOK_URL,
    WEBHOOK_PATH
  };
}


