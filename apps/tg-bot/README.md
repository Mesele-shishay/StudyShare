# StudyShare Telegram Bot

A Telegram bot built with grammY and Express for the StudyShare platform.

## Features

- 🎓 Welcome and help commands
- 📚 Study material discovery (coming soon)
- 👥 Study partner matching (coming soon)
- 📝 Progress tracking (coming soon)
- 🎯 Goal setting (coming soon)

## Setup

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- A Telegram bot token from [@BotFather](https://t.me/BotFather)
- A public HTTPS URL for webhooks (e.g., [ngrok](https://ngrok.com/) or a deployed server)

### Installation

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Set up environment variables:**

   ```bash
   cp env.example .env
   ```

   Edit `.env` and add your bot token and webhook URL:

   ```env
   BOT_TOKEN=your_actual_bot_token_here
   WEBHOOK_URL=https://yourdomain.com/your-webhook-path
   # (Optional) WEB_APP_URL, NODE_ENV, DEBUG
   ```
   - `BOT_TOKEN`: Get from [@BotFather](https://t.me/BotFather)
   - `WEBHOOK_URL`: Must be a public HTTPS URL (e.g., from ngrok or your deployed server). Example: `https://abcd1234.ngrok.io/webhook`.
   - `WEB_APP_URL`: (Optional) Your web app's URL if using Telegram Web Apps.

3. **Get a bot token:**
   - Open Telegram and message [@BotFather](https://t.me/BotFather)
   - Send `/newbot` and follow the instructions
   - Copy the token and paste it in your `.env` file

## Running the Bot

The bot uses webhooks (not polling) and runs an Express server to receive updates from Telegram.

### Development (with local webhook):

1. Start a tunnel to expose your local server (e.g., with ngrok):

   ```bash
   ngrok http 3000
   ```

   Copy the HTTPS URL from ngrok and set it as your `WEBHOOK_URL` in `.env`, appending a path (e.g., `/webhook`).

2. Start the bot:

   ```bash
   pnpm dev
   ```

### Production:

1. Build the bot:

   ```bash
   pnpm build
   ```

2. Start the bot:

   ```bash
   pnpm start
   ```

## Environment Variables

See `env.example` for all available variables. At minimum, you must set:

- `BOT_TOKEN`
- `WEBHOOK_URL`

## Project Structure

```
src/
├── commands/          # Bot command handlers
│   ├── index.ts      # Command registration
│   ├── start.ts      # /start command
│   └── help.ts       # /help command
├── config/           # Configuration
│   └── index.ts      # Environment variables
├── middleware/       # Bot middleware
│   └── index.ts      # Middleware setup
├── utils/           # Utilities
│   └── logger.ts    # Logging utility
└── index.ts         # Main entry point (Express + webhook)
```

## Available Commands

- `/start` - Welcome message and bot introduction
- `/help` - Show available commands

## Troubleshooting

- If the bot does not respond, ensure your `WEBHOOK_URL` is correct and publicly accessible.
- Check logs for errors about missing `BOT_TOKEN` or `WEBHOOK_URL`.
- If using ngrok, restart the bot and update the `WEBHOOK_URL` each time ngrok restarts.

## Contributing

1. Create a feature branch
2. Make your changes
3. Add tests if applicable
4. Submit a pull request

## License

MIT
