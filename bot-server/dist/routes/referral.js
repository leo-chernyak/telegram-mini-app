"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReferralRouter = createReferralRouter;
const express_1 = require("express");
const validateInitData_1 = require("../telegram/validateInitData");
function createReferralRouter(env) {
    const router = (0, express_1.Router)();
    router.post('/link', (req, res) => {
        const initData = String(req.body?.initData ?? '');
        try {
            const { userId } = (0, validateInitData_1.validateInitData)(initData, env.BOT_TOKEN);
            const url = `https://t.me/${env.BOT_USERNAME}?start=ref_${userId}`;
            res.json({ ok: true, url });
        }
        catch (e) {
            res.status(401).json({ ok: false, error: e.message });
        }
    });
    return router;
}
