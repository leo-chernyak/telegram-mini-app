"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBot = createBot;
const telegraf_1 = require("telegraf");
function buildWebAppUrl(env, hashPath) {
    const base = env.MINIAPP_URL.replace(/\/$/, '');
    const hash = hashPath.startsWith('#') ? hashPath : `#${hashPath}`;
    return `${base}/${hash}`;
}
function parseStartRef(startPayload) {
    if (!startPayload)
        return undefined;
    if (!startPayload.startsWith('ref_'))
        return undefined;
    const raw = startPayload.slice('ref_'.length);
    const userId = Number(raw);
    if (!Number.isFinite(userId))
        return undefined;
    return userId;
}
function parseInvoicePayload(payload) {
    if (!payload)
        return {};
    try {
        const parsed = JSON.parse(payload);
        return parsed ?? {};
    }
    catch {
        return {};
    }
}
function createBot(env, store) {
    const bot = new telegraf_1.Telegraf(env.BOT_TOKEN);
    bot.start(async (ctx) => {
        const refUserId = parseStartRef(ctx.startPayload);
        if (refUserId) {
            // MVP: acknowledge referral without extra business logic.
            await ctx.reply('Реферальная ссылка принята.');
        }
        const keyboard = telegraf_1.Markup.keyboard([
            [telegraf_1.Markup.button.webApp('Оплатить подписку', buildWebAppUrl(env, '#/pay'))],
            [telegraf_1.Markup.button.webApp('Статус подписки', buildWebAppUrl(env, '#/status'))],
            [telegraf_1.Markup.button.webApp('Ссылка для приглашения друга', buildWebAppUrl(env, '#/invite'))],
            [telegraf_1.Markup.button.webApp('Документы', buildWebAppUrl(env, '#/docs'))]
        ])
            .resize()
            .persistent();
        await ctx.reply('Tuman — управление подпиской.', keyboard);
    });
    // Successful payment comes as message.successful_payment
    bot.on('message', async (ctx, next) => {
        const msg = ctx.message;
        if (msg?.successful_payment) {
            const paidAtMs = Date.now();
            const fromId = Number(ctx.from?.id);
            const payload = parseInvoicePayload(msg.successful_payment?.invoice_payload);
            const plan = payload.plan === 'year' ? 'year' : 'month';
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
