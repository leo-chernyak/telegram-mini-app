"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubscriptionRouter = createSubscriptionRouter;
const express_1 = require("express");
const validateInitData_1 = require("../telegram/validateInitData");
function createSubscriptionRouter(env, deps) {
    const router = (0, express_1.Router)();
    router.post('/status', (req, res) => {
        const initData = String(req.body?.initData ?? '');
        try {
            const { userId } = (0, validateInitData_1.validateInitData)(initData, env.BOT_TOKEN);
            const { status, record } = deps.store.getStatus(userId);
            res.json({
                ok: true,
                status,
                plan: record?.plan ?? null,
                expiresAt: record?.expiresAt ?? null
            });
        }
        catch (e) {
            res.status(401).json({ ok: false, error: e.message });
        }
    });
    return router;
}
