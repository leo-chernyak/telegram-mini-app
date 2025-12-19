"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const config_1 = require("./config");
const bot_1 = require("./bot");
const server_1 = require("./server");
const subscriptionStore_1 = require("./storage/subscriptionStore");
async function main() {
    const env = (0, config_1.loadConfig)();
    const store = (0, subscriptionStore_1.createSubscriptionStore)();
    const bot = (0, bot_1.createBot)(env, store);
    const app = (0, server_1.createServer)(env, { telegram: bot.telegram, store });
    if (env.WEBHOOK_URL) {
        await bot.telegram.setWebhook(`${env.WEBHOOK_URL}${env.WEBHOOK_PATH}`);
        app.use(env.WEBHOOK_PATH, bot.webhookCallback(env.WEBHOOK_PATH));
        // Do not launch polling when webhook is enabled.
    }
    else {
        await bot.launch();
    }
    const server = app.listen(env.PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`bot-server listening on :${env.PORT}`);
    });
    process.once('SIGINT', () => {
        server.close();
        bot.stop('SIGINT');
    });
    process.once('SIGTERM', () => {
        server.close();
        bot.stop('SIGTERM');
    });
}
main().catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
});
