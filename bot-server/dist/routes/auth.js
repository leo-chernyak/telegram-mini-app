"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthRouter = createAuthRouter;
const express_1 = require("express");
const validateInitData_1 = require("../telegram/validateInitData");
function createAuthRouter(env) {
    const router = (0, express_1.Router)();
    router.post('/validate', (req, res) => {
        const initData = String(req.body?.initData ?? '');
        try {
            const { userId } = (0, validateInitData_1.validateInitData)(initData, env.BOT_TOKEN);
            res.json({ ok: true, userId });
        }
        catch (e) {
            res.status(401).json({ ok: false, error: e.message });
        }
    });
    return router;
}
