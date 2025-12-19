import { Router } from 'express';
import type { Env } from '../config';
import { validateInitData } from '../telegram/validateInitData';

export function createAuthRouter(env: Env) {
  const router = Router();

  router.post('/validate', (req, res) => {
    const initData = String(req.body?.initData ?? '');
    try {
      const { userId } = validateInitData(initData, env.BOT_TOKEN);
      res.json({ ok: true, userId });
    } catch (e) {
      res.status(401).json({ ok: false, error: (e as Error).message });
    }
  });

  return router;
}


