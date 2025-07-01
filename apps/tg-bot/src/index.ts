import { Bot } from "grammy";
import { config } from "./config";
import { setupCommands } from "./commands";
import { setupMiddleware } from "./middleware";
import { logger } from "./utils/logger";

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

    // Start the bot
    logger.info("Starting bot...");
    await bot.start({
      onStart: (botInfo) => {
        logger.info(`Bot @${botInfo.username} started successfully!`);
      },
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
