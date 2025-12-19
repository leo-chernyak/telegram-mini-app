"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createInvoiceRouter = createInvoiceRouter;
const express_1 = require("express");
const validateInitData_1 = require("../telegram/validateInitData");
function planToInvoice(plan) {
    if (plan === 'year') {
        return {
            title: 'Tuman VPN — Год',
            description: 'Подписка на 12 месяцев',
            amountMinor: 199000
        };
    }
    return {
        title: 'Tuman VPN — Месяц',
        description: 'Подписка на 1 месяц',
        amountMinor: 19900
    };
}
function createInvoiceRouter(env, deps) {
    const router = (0, express_1.Router)();
    router.post('/create', async (req, res) => {
        const body = (req.body ?? {});
        const initData = String(body.initData ?? '');
        const plan = body.plan === 'year' ? 'year' : 'month';
        try {
            const { userId } = (0, validateInitData_1.validateInitData)(initData, env.BOT_TOKEN);
            const invoice = planToInvoice(plan);
            const payload = JSON.stringify({ userId, plan });
            const invoiceLink = await deps.telegram.createInvoiceLink({
                title: invoice.title,
                description: invoice.description,
                payload,
                provider_token: env.PAYMENTS_PROVIDER_TOKEN,
                currency: 'RUB',
                prices: [{ label: invoice.title, amount: invoice.amountMinor }]
            });
            res.json({ ok: true, invoiceLink });
        }
        catch (e) {
            res.status(400).json({ ok: false, error: e.message });
        }
    });
    return router;
}
