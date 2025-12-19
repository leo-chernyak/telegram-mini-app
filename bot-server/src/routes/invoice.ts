import { Router } from 'express';
import type { Telegram } from 'telegraf';
import type { Env } from '../config';
import { validateInitData } from '../telegram/validateInitData';
import type { Plan, SubscriptionStore } from '../storage/subscriptionStore';

type CreateInvoiceBody = {
  initData?: string;
  plan?: Plan;
};

function planToInvoice(plan: Plan) {
  if (plan === 'year') {
    return {
      title: 'Tuman VPN — Год',
      description: 'Подписка на 12 месяцев',
      amountMinor: 1990_00
    };
  }
  return {
    title: 'Tuman VPN — Месяц',
    description: 'Подписка на 1 месяц',
    amountMinor: 199_00
  };
}

export function createInvoiceRouter(env: Env, deps: { telegram: Telegram; store: SubscriptionStore }) {
  const router = Router();

  router.post('/create', async (req, res) => {
    const body = (req.body ?? {}) as CreateInvoiceBody;
    const initData = String(body.initData ?? '');
    const plan: Plan = body.plan === 'year' ? 'year' : 'month';

    try {
      const { userId } = validateInitData(initData, env.BOT_TOKEN);
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
    } catch (e) {
      res.status(400).json({ ok: false, error: (e as Error).message });
    }
  });

  return router;
}


