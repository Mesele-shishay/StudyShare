import { Bot } from "grammy";
import { logger } from "../utils/logger";

export function setupMiddleware(bot: Bot) {
  // Log all updates
  bot.use(async (ctx, next) => {
    const start = Date.now();
    logger.debug(`Received update: ${ctx.update.update_id}`);

    await next();

    const duration = Date.now() - start;
    logger.debug(`Update processed in ${duration}ms`);
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
