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
          <p>Mode: <b>${config.NODE_ENV === "production" ? "Webhook" : "Long Polling"}</b></p>
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

// Only require WEBHOOK_URL in production
if (config.NODE_ENV === "production" && !config.WEBHOOK_URL) {
  logger.error("WEBHOOK_URL is required in production");
  process.exit(1);
}

async function main() {
  try {
    logger.info("Initializing bot...");
    const bot = new Bot(config.BOT_TOKEN);

    // Test bot connection first
    try {
      const me = await bot.api.getMe();
      logger.info(
        `Bot authenticated successfully: @${me.username} (${me.first_name})`
      );
    } catch (error) {
      logger.error("Failed to authenticate bot:", error);
      throw error;
    }

    setupMiddleware(bot);
    setupCommands(bot);

    bot.catch((err) => {
      logger.error("Bot error:", err);
    });

    if (config.NODE_ENV === "production") {
      // Production: Use webhooks
      logger.info("Production mode: Setting up webhook...");
      await bot.api.setWebhook(config.WEBHOOK_URL!);
      logger.info(`Webhook set to: ${config.WEBHOOK_URL}`);

      // Extract path from WEBHOOK_URL for Express
      const url = new URL(config.WEBHOOK_URL!);
      const path = url.pathname;

      app.use(path, webhookCallback(bot, "express"));

      app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
        logger.info(`Listening for Telegram updates at ${path}`);
        logger.info(`Production mode: Webhook enabled`);
      });
    } else {
      // Development: Use long polling
      logger.info("Development mode: Starting long polling...");

      try {
        // Start the bot with long polling
        await bot.start({
          onStart: (botInfo) => {
            logger.info(`✅ Bot started successfully as @${botInfo.username}`);
            logger.info("Long polling is now active - send /start to test!");
          },
        });
      } catch (error) {
        logger.error("Failed to start long polling:", error);
        throw error;
      }

      // Start Express server for health checks
      app.listen(PORT, () => {
        logger.info(`Health check server running on port ${PORT}`);
        logger.info("Visit http://localhost:3000 to check bot status");
      });
    }

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
