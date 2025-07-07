import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export const config = {
  BOT_TOKEN: process.env.BOT_TOKEN || "",
  NODE_ENV: process.env.NODE_ENV,
  DEBUG: process.env.DEBUG === "true",
  WEB_APP_URL: process.env.WEB_APP_URL,
  WEBHOOK_URL: process.env.WEBHOOK_URL, // Optional for development, required for production

  // Proxy configuration
  PROXY_HOST: process.env.PROXY_HOST, // SOCKS proxy hostname/IP
  PROXY_PORT: process.env.PROXY_PORT, // SOCKS proxy port
  PROXY_USERNAME: process.env.PROXY_USERNAME, // Optional proxy authentication
  PROXY_PASSWORD: process.env.PROXY_PASSWORD, // Optional proxy authentication
} as const;

// Validate required environment variables
if (!config.BOT_TOKEN) {
  throw new Error("BOT_TOKEN environment variable is required");
}
