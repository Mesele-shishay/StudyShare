import { Context } from "grammy";

export async function helpCommand(ctx: Context) {
  const helpMessage = `
📖 StudyShare Bot - Available Commands

/start - Start the bot and see welcome message
/help - Show this help message

More features coming soon! 🚀

For support, contact the development team.
  `.trim();

  await ctx.reply(helpMessage);
}
