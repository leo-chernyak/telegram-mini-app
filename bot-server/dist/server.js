"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = createServer;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const auth_1 = require("./routes/auth");
const docs_1 = require("./routes/docs");
const invoice_1 = require("./routes/invoice");
const referral_1 = require("./routes/referral");
const subscription_1 = require("./routes/subscription");
function createServer(env, deps) {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    // Dev only convenience. In prod miniapp is served from same origin.
    app.use((0, cors_1.default)({ origin: env.MINIAPP_ORIGIN }));
    app.get('/health', (_req, res) => res.json({ ok: true }));
    app.use('/api/auth', (0, auth_1.createAuthRouter)(env));
    app.use('/api/invoice', (0, invoice_1.createInvoiceRouter)(env, deps));
    app.use('/api/subscription', (0, subscription_1.createSubscriptionRouter)(env, deps));
    app.use('/api/referral', (0, referral_1.createReferralRouter)(env));
    app.use('/api/docs', (0, docs_1.createDocsRouter)());
    const publicMiniappDir = path_1.default.resolve(__dirname, '..', 'public-miniapp');
    app.use(express_1.default.static(publicMiniappDir));
    // Hash routing avoids 404, but keep a safe fallback for non-/api paths.
    app.get('*', (req, res, next) => {
        if (req.path.startsWith('/api/'))
            return next();
        res.sendFile(path_1.default.join(publicMiniappDir, 'index.html'), (err) => {
            if (err)
                next();
        });
    });
    return app;
}
