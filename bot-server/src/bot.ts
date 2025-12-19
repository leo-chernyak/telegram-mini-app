import { Markup, Telegraf } from 'telegraf';
import type { Env } from './config';
import type { Plan, SubscriptionStore } from './storage/subscriptionStore';

function buildWebAppUrl(env: Env, hashPath: string) {
  const base = env.MINIAPP_URL.replace(/\/$/, '');
  const hash = hashPath.startsWith('#') ? hashPath : `#${hashPath}`;
  return `${base}/${hash}`;
}

function parseStartRef(startPayload: string | undefined) {
  if (!startPayload) return undefined;
  if (!startPayload.startsWith('ref_')) return undefined;
  const raw = startPayload.slice('ref_'.length);
  const userId = Number(raw);
  if (!Number.isFinite(userId)) return undefined;
  return userId;
}

function parseInvoicePayload(payload: string | undefined): { plan?: Plan } {
  if (!payload) return {};
  try {
    const parsed = JSON.parse(payload) as { plan?: Plan };
    return parsed ?? {};
  } catch {
    return {};
  }
}

export function createBot(env: Env, store: SubscriptionStore) {
  const bot = new Telegraf(env.BOT_TOKEN);

  bot.start(async (ctx) => {
    const refUserId = parseStartRef((ctx as any).startPayload);
    if (refUserId) {
      // MVP: acknowledge referral without extra business logic.
      await ctx.reply('Реферальная ссылка принята.');
    }

    const keyboard = Markup.keyboard([
      [Markup.button.webApp('Оплатить подписку', buildWebAppUrl(env, '#/pay'))],
      [Markup.button.webApp('Статус подписки', buildWebAppUrl(env, '#/status'))],
      [Markup.button.webApp('Ссылка для приглашения друга', buildWebAppUrl(env, '#/invite'))],
      [Markup.button.webApp('Документы', buildWebAppUrl(env, '#/docs'))]
    ])
      .resize()
      .persistent();

    await ctx.reply('Tuman — управление подпиской.', keyboard);
  });

  // Successful payment comes as message.successful_payment
  bot.on('message', async (ctx, next) => {
    const msg: any = (ctx as any).message;
    if (msg?.successful_payment) {
      const paidAtMs = Date.now();
      const fromId = Number((ctx as any).from?.id);
      const payload = parseInvoicePayload(msg.successful_payment?.invoice_payload);
      const plan: Plan = payload.plan === 'year' ? 'year' : 'month';
      if (Number.isFinite(fromId)) {
        store.applyPayment(fromId, plan, paidAtMs);
      }
      await ctx.reply('Оплата получена. Откройте мини-приложение и нажмите “Проверить статус”.');
      return;
    }
    return next();
  });

  return bot;
}


