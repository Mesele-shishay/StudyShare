import { Bot } from "grammy";
import { startCommand } from "./start";
import { helpCommand } from "./help";

export function setupCommands(bot: Bot) {
  // Register commands
  bot.command("start", startCommand);
  bot.command("help", helpCommand);

  // Handle unknown commands
  bot.command("", (ctx) => {
    ctx.reply("Unknown command. Use /help to see available commands.");
  });
}
