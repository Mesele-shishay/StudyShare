import { Context } from "grammy";

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

  await ctx.reply(welcomeMessage);
}
