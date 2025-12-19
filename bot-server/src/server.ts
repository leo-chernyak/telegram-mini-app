import cors from 'cors';
import express from 'express';
import path from 'path';
import type { Env } from './config';
import type { Telegram } from 'telegraf';
import type { SubscriptionStore } from './storage/subscriptionStore';

import { createAuthRouter } from './routes/auth';
import { createDocsRouter } from './routes/docs';
import { createInvoiceRouter } from './routes/invoice';
import { createReferralRouter } from './routes/referral';
import { createSubscriptionRouter } from './routes/subscription';

export function createServer(env: Env, deps: { telegram: Telegram; store: SubscriptionStore }) {
  const app = express();
  app.use(express.json());

  // Dev only convenience. In prod miniapp is served from same origin.
  app.use(cors({ origin: env.MINIAPP_ORIGIN }));

  app.get('/health', (_req, res) => res.json({ ok: true }));

  app.use('/api/auth', createAuthRouter(env));
  app.use('/api/invoice', createInvoiceRouter(env, deps));
  app.use('/api/subscription', createSubscriptionRouter(env, deps));
  app.use('/api/referral', createReferralRouter(env));
  app.use('/api/docs', createDocsRouter());

  const publicMiniappDir = path.resolve(__dirname, '..', 'public-miniapp');
  app.use(express.static(publicMiniappDir));

  // Hash routing avoids 404, but keep a safe fallback for non-/api paths.
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(publicMiniappDir, 'index.html'), (err) => {
      if (err) next();
    });
  });

  return app;
}


