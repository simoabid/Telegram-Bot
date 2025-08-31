---
description: Repository Information Overview
alwaysApply: true
---

# Sasuke Bot Telegram Information

## Summary
A complete conversion of a WhatsApp bot to Telegram, preserving all functionality and features. The bot includes 434 plugins covering various functionalities like group management, media handling, downloads, games, AI integration, and more.

## Structure
- **telegram-index.js**: Main entry point for the Telegram bot
- **telegram-main.js**: Core Telegram bot logic
- **telegram-handler.js**: Message processing system
- **telegram-config.js**: Bot configuration
- **telegram-plugins/**: Contains all 434 converted plugins
- **lib/**: Core libraries and utilities
- **storage/**: Data storage directory
- **db/**: Database files and configurations

## Language & Runtime
**Language**: JavaScript (Node.js)
**Version**: Node.js LTS (Buster)
**Build System**: npm
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- node-telegram-bot-api: ^0.66.0 (Telegram Bot API)
- axios: ^1.1.2 (HTTP client)
- cheerio: ^1.0.0-rc.12 (HTML parsing)
- express: ^4.18.1 (Web server)
- mongoose: ^6.6.5 (MongoDB integration)
- openai: ^3.3.0 (AI integration)
- dotenv: ^17.2.1 (Environment configuration)
- lowdb: ^3.0.0 (JSON database)

**Development Dependencies**:
- eslint (Code linting)
- nodemon (Development server)

## Build & Installation
```bash
# Install dependencies
npm install

# Configure Telegram bot
node setup-telegram.js

# Start the Telegram bot
npm run telegram
# or
npm run tg
```

## Docker
**Dockerfile**: Dockerfile
**Image**: Node.js LTS Buster
**Configuration**:
- Installs ffmpeg, imagemagick, and webp
- Exposes port 5000
- Runs the bot with `node index.js --server`

## Testing
**Framework**: Custom testing system
**Test Location**: test.js, bot-tester.js
**Run Command**:
```bash
npm test
```

## Bot Configuration
**Token Setup**:
- Set via environment variable: `TELEGRAM_BOT_TOKEN`
- Or configure in telegram-config.js

**Command Prefixes**:
- `/` (Telegram standard)
- `.` (Original WhatsApp style)
- `#` and `!` (Alternative prefixes)

## Key Features
- **Group Management**: Admin tools, moderation, welcome messages
- **Media Handling**: Images, videos, audio, stickers, documents
- **Download Features**: YouTube, TikTok, Instagram, Facebook, etc.
- **Games & Fun**: Various entertainment features
- **AI Integration**: ChatGPT and other AI features
- **Complete Database System**: User management, RPG system, economy