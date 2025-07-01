# StudyShare Telegram Bot

A Telegram bot built with grammY for the StudyShare platform.

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

### Installation

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Set up environment variables:**

   ```bash
   cp env.example .env
   ```

   Edit `.env` and add your bot token:

   ```env
   BOT_TOKEN=your_actual_bot_token_here
   ```

3. **Get a bot token:**
   - Open Telegram and message [@BotFather](https://t.me/BotFather)
   - Send `/newbot` and follow the instructions
   - Copy the token and paste it in your `.env` file

## Development

### Running in development mode:

```bash
pnpm dev
```

### Building for production:

```bash
pnpm build
```

### Running in production:

```bash
pnpm start
```

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
└── index.ts         # Main entry point
```

## Available Commands

- `/start` - Welcome message and bot introduction
- `/help` - Show available commands

## Contributing

1. Create a feature branch
2. Make your changes
3. Add tests if applicable
4. Submit a pull request

## License

MIT
