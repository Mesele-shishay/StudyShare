import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const config = {
  BOT_TOKEN:
    process.env.BOT_TOKEN || "7704609777:AAFNXW9zc2CCnxCs9L5xjwpiP_TtzOyurDY",
  NODE_ENV: process.env.NODE_ENV || "development",
  DEBUG: process.env.DEBUG === "true",
  WEB_APP_URL: process.env.WEB_APP_URL || "",
  WEBHOOK_URL: process.env.WEBHOOK_URL || "",
} as const;

// Validate required environment variables
if (!config.BOT_TOKEN) {
  throw new Error("BOT_TOKEN environment variable is required");
}
