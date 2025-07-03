import { Bot, webhookCallback } from "grammy";
import { config } from "./config";
import { setupCommands } from "./commands";
import { setupMiddleware } from "./middleware";
import { logger } from "./utils/logger";
import express from "express";

const app = express(); // or whatever you're using
app.use(express.json()); // parse the JSON request body

const WEBHOOK_PATH = process.env.WEBHOOK_PATH || "/"; // Allow custom webhook path
const PORT = process.env.PORT || 3000; // Allow custom port

async function main() {
  try {
    // Create bot instance
    const bot = new Bot(config.BOT_TOKEN);

    // Setup middleware
    setupMiddleware(bot);

    // Setup commands
    setupCommands(bot);

    // Error handling
    bot.catch((err) => {
      logger.error("Bot error:", err);
    });

    // Set webhook with path if not root
    const webhookUrl = config.WEBHOOK_URL.endsWith(WEBHOOK_PATH)
      ? config.WEBHOOK_URL
      : config.WEBHOOK_URL.replace(/\/$/, "") + WEBHOOK_PATH;
    await bot.api.setWebhook(webhookUrl);
    logger.info(`Webhook set to: ${webhookUrl}`);

    // Start the bot
    logger.info("Starting bot...");

    // Attach webhook handler to the specified path
    app.use(WEBHOOK_PATH, webhookCallback(bot, "express"));

    // Start Express server
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
      logger.info(`Listening for Telegram updates at ${WEBHOOK_PATH}`);
    });

    // Graceful shutdown
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

// Start the application
main().catch((error) => {
  logger.error("Unhandled error:", error);
  process.exit(1);
});
