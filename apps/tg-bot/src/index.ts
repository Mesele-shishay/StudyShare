import { Bot, webhookCallback } from "grammy";
import { config } from "./config";
import { setupCommands } from "./commands";
import { setupMiddleware } from "./middleware";
import { logger } from "./utils/logger";
import express from "express";

const app = express();
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).send(`
    <html>
      <head>
        <title>StudyShare Telegram Bot</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background: #181c20; color: #f3f6fa; margin: 0; padding: 0; }
          .container { max-width: 480px; margin: 60px auto; background: #23272f; border-radius: 12px; box-shadow: 0 2px 16px rgba(0,0,0,0.18); padding: 32px; }
          h1 { color: #6cb4ff; margin-bottom: 0.5em; }
          .dev { margin-top: 2em; font-size: 0.98em; color: #b0b8c1; }
          a { color: #6cb4ff; text-decoration: none; }
          a:hover { text-decoration: underline; }
          p { color: #e0e6ed; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🤖 StudyShare Telegram Bot</h1>
          <p>Status: <b>Online</b> <span style="color: #27ae60;">●</span></p>
          <div class="dev">
            <p>Developed by <b>StudyShare Team</b></p>
            <p>
              <a href="https://github.com/Mesele-Shishay" target="_blank">GitHub</a> &middot;
              <a href="mailto:messeleshishaymm@gmail.com">Contact</a>
            </p>
          </div>
        </div>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;

// Validate env
if (!config.BOT_TOKEN) {
  logger.error("BOT_TOKEN is not set");
  process.exit(1);
}
if (!config.WEBHOOK_URL) {
  logger.error("WEBHOOK_URL is not set");
  process.exit(1);
}

async function main() {
  try {
    const bot = new Bot(config.BOT_TOKEN);

    setupMiddleware(bot);
    setupCommands(bot);

    bot.catch((err) => {
      logger.error("Bot error:", err);
    });

    // Set webhook
    await bot.api.setWebhook(config.WEBHOOK_URL);
    logger.info(`Webhook set to: ${config.WEBHOOK_URL}`);

    // Extract path from WEBHOOK_URL for Express
    const url = new URL(config.WEBHOOK_URL);
    const path = url.pathname;

    app.use(path, webhookCallback(bot, "express"));

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      logger.info(`Listening for Telegram updates at ${path}`);
      logger.info(
        `Set WEBHOOK_URL to your public URL (e.g., https://yourdomain.com/webhook)`
      );
    });

    process.once("SIGINT", () => {
      logger.info("Received SIGINT, stopping bot...");
      bot.stop();
    });

    process.once("SIGTERM", () => {
      logger.info("Received SIGTERM, stopping bot...");
      bot.stop();
    });
  } catch (error) {
    logger.error("Failed to start bot:", error);
    process.exit(1);
  }
}

main().catch((error) => {
  logger.error("Unhandled error:", error);
  process.exit(1);
});
