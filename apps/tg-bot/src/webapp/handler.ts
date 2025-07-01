import { Context } from "grammy";
import { WebAppData } from "grammy/types";

export interface WebAppUser {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export interface WebAppInitData {
  query_id?: string;
  user?: WebAppUser;
  receiver?: WebAppUser;
  chat?: any;
  chat_type?: string;
  chat_instance?: string;
  start_param?: string;
  can_send_after?: number;
  auth_date: number;
  hash: string;
}

export async function handleWebAppData(ctx: Context) {
  try {
    // Check if the message contains web app data
    if (!ctx.message?.web_app_data) {
      return;
    }

    const webAppData: WebAppData = ctx.message.web_app_data;

    // Parse the data (it comes as a string)
    let parsedData: any;
    try {
      parsedData = JSON.parse(webAppData.data);
    } catch (error) {
      console.error("Failed to parse web app data:", error);
      await ctx.reply("Sorry, there was an error processing the web app data.");
      return;
    }

    // Handle different types of web app interactions
    switch (parsedData.action) {
      case "course_selected":
        await handleCourseSelection(ctx, parsedData);
        break;
      case "profile_updated":
        await handleProfileUpdate(ctx, parsedData);
        break;
      case "study_session_started":
        await handleStudySession(ctx, parsedData);
        break;
      default:
        await ctx.reply(
          "Received web app data: " + JSON.stringify(parsedData, null, 2)
        );
    }
  } catch (error) {
    console.error("Error handling web app data:", error);
    await ctx.reply("Sorry, there was an error processing your request.");
  }
}

async function handleCourseSelection(ctx: Context, data: any) {
  const message = `
📚 **Course Selected!**

Course: ${data.courseName || "Unknown"}
Duration: ${data.duration || "Not specified"}
Progress: ${data.progress || 0}%

Great choice! Keep up the good work! 🎓
  `.trim();

  await ctx.reply(message, { parse_mode: "Markdown" });
}

async function handleProfileUpdate(ctx: Context, data: any) {
  const message = `
👤 **Profile Updated!**

Your profile has been successfully updated in the StudyShare app.

Updated fields: ${Object.keys(data.updates || {}).join(", ") || "None"}

Your changes have been saved! ✅
  `.trim();

  await ctx.reply(message, { parse_mode: "Markdown" });
}

async function handleStudySession(ctx: Context, data: any) {
  const message = `
⏱️ **Study Session Started!**

Session: ${data.sessionName || "Study Session"}
Duration: ${data.duration || "Not specified"}
Subject: ${data.subject || "Not specified"}

Good luck with your studies! 📖✨
  `.trim();

  await ctx.reply(message, { parse_mode: "Markdown" });
}
