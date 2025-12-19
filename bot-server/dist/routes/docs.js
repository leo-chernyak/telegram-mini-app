"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDocsRouter = createDocsRouter;
const express_1 = require("express");
function createDocsRouter() {
    const router = (0, express_1.Router)();
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
