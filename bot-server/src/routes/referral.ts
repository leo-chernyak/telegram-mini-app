import { Router } from 'express';
import type { Env } from '../config';
import { validateInitData } from '../telegram/validateInitData';

export function createReferralRouter(env: Env) {
  const router = Router();

  router.post('/link', (req, res) => {
    const initData = String(req.body?.initData ?? '');
    try {
      const { userId } = validateInitData(initData, env.BOT_TOKEN);
      const url = `https://t.me/${env.BOT_USERNAME}?start=ref_${userId}`;
      res.json({ ok: true, url });
    } catch (e) {
      res.status(401).json({ ok: false, error: (e as Error).message });
    }
  });

  return router;
}


