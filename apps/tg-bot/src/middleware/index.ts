import { Bot } from "grammy";
import { logger } from "../utils/logger";
import { handleWebAppData } from "../webapp/handler";

export function setupMiddleware(bot: Bot) {
  // Log all updates
  bot.use(async (ctx, next) => {
    const start = Date.now();
    logger.debug(`Received update: ${ctx.update.update_id}`);

    await next();

    const duration = Date.now() - start;
    logger.debug(`Update processed in ${duration}ms`);
  });

  // Handle web app data
  bot.use(async (ctx, next) => {
    // Check if this is a web app data message
    if (ctx.message?.web_app_data) {
      await handleWebAppData(ctx);
      return; // Don't continue to other handlers
    }

    await next();
  });

  // Handle errors
  bot.use(async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      logger.error("Error in middleware:", error);
      await ctx.reply("Sorry, something went wrong. Please try again later.");
    }
  });
}
