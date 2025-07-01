import { Context } from "grammy";
import { WebAppInfo } from "@grammyjs/web-app";
import { config } from "../config";

export async function webappCommand(ctx: Context) {
  try {
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

    const message = `
📱 **StudyShare Mini App**

Tap the button below to open the StudyShare web app directly in Telegram!

✨ **Features available in the app:**
• Browse courses and study materials
• Connect with study partners
• Track your learning progress
• Manage your profile and preferences

Click the button below to get started! 🎓
    `.trim();

    await ctx.reply(message, {
      parse_mode: "Markdown",
      reply_markup: keyboard,
    });
  } catch (error) {
    console.error("Error in webapp command:", error);
    await ctx.reply(
      "Sorry, there was an error opening the web app. Please try again later."
    );
  }
}
