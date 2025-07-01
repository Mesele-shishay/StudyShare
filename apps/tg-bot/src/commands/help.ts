import { Context } from "grammy";

export async function helpCommand(ctx: Context) {
  const helpMessage = `
📖 StudyShare Bot - Available Commands

/start - Start the bot and see welcome message with web app button
/help - Show this help message
/webapp - Open the StudyShare mini app directly

🚀 **Web App Features:**
• Browse courses and study materials
• Connect with study partners
• Track your learning progress
• Manage your profile and preferences

More features coming soon! 🚀

For support, contact the development team.
  `.trim();

  await ctx.reply(helpMessage);
}
