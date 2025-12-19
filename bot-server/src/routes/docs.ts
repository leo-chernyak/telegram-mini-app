import { Router } from 'express';

export function createDocsRouter() {
  const router = Router();

  router.get('/', (_req, res) => {
    res.json({
      ok: true,
      docs: [
        { id: 'terms', title: 'Пользовательское соглашение', url: '/docs/terms' },
        { id: 'pd', title: 'Политика обработки персональных данных', url: '/docs/personal-data' },
        { id: 'privacy', title: 'Политика конфиденциальности', url: '/docs/privacy' }
      ]
    });
  });

  return router;
}


