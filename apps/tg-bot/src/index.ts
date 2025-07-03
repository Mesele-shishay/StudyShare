import { Bot, webhookCallback } from "grammy";
import { config } from "./config";
import { setupCommands } from "./commands";
import { setupMiddleware } from "./middleware";
import { logger } from "./utils/logger";
import express from "express";

const app = express(); // or whatever you're using
app.use(express.json()); // parse the JSON request body

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
    await bot.api.setWebhook(config.WEBHOOK_URL);

    // Start the bot
    logger.info("Starting bot...");

    // "express" is also used as default if no argument is given.
    app.use(webhookCallback(bot, "express"));

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
