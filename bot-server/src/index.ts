import 'dotenv/config';
import { loadConfig } from './config';
import { createBot } from './bot';
import { createServer } from './server';
import { createSubscriptionStore } from './storage/subscriptionStore';

async function main() {
  const env = loadConfig();
  const store = createSubscriptionStore();
  const bot = createBot(env, store);
  const app = createServer(env, { telegram: bot.telegram, store });

  if (env.WEBHOOK_URL) {
    await bot.telegram.setWebhook(`${env.WEBHOOK_URL}${env.WEBHOOK_PATH}`);
    app.use(env.WEBHOOK_PATH, bot.webhookCallback(env.WEBHOOK_PATH));
    // Do not launch polling when webhook is enabled.
  } else {
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


