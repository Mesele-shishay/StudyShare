import { Context } from "grammy";
import { config } from "../config";
import { WebAppInfo } from "grammy/types";

export async function startCommand(ctx: Context) {
  const welcomeMessage = `
🎓 Welcome to StudyShare Bot!

I'm here to help you with your learning journey. Here's what I can do:

📚 Find study materials
👥 Connect with study partners
📝 Track your progress
🎯 Set learning goals

Use /help to see all available commands.

Happy studying! 📖✨
  `.trim();

  // Create web app info
  const webAppInfo: WebAppInfo = {
    url: config.WEB_APP_URL,
  };

  // Create inline keyboard with web app button
  const keyboard = {
    inline_keyboard: [
      [
        {
          text: "🚀 Open StudyShare App",
          web_app: webAppInfo,
        },
      ],
    ],
  };

  await ctx.reply(welcomeMessage, {
    reply_markup: keyboard,
  });
}
