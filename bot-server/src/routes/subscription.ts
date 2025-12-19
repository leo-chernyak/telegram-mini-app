import { Router } from 'express';
import type { Env } from '../config';
import { validateInitData } from '../telegram/validateInitData';
import type { SubscriptionStore } from '../storage/subscriptionStore';

export function createSubscriptionRouter(env: Env, deps: { store: SubscriptionStore }) {
  const router = Router();

  router.post('/status', (req, res) => {
    const initData = String(req.body?.initData ?? '');
    try {
      const { userId } = validateInitData(initData, env.BOT_TOKEN);
      const { status, record } = deps.store.getStatus(userId);
      res.json({
        ok: true,
        status,
        plan: record?.plan ?? null,
        expiresAt: record?.expiresAt ?? null
      });
    } catch (e) {
      res.status(401).json({ ok: false, error: (e as Error).message });
    }
  });

  return router;
}


