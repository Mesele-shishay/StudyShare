import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const config = {
  BOT_TOKEN:
    process.env.BOT_TOKEN || "8066511941:AAGeyNE37syquVfH27K2Y6S1odcBhZjno3o",
  NODE_ENV: process.env.NODE_ENV || "development",
  DEBUG: process.env.DEBUG === "true",
  WEB_APP_URL: process.env.WEB_APP_URL || "https://study-share-web.vercel.app/",
  WEBHOOK_URL: process.env.WEBHOOK_URL, // Optional for development, required for production
} as const;

// Validate required environment variables
if (!config.BOT_TOKEN) {
  throw new Error("BOT_TOKEN environment variable is required");
}
