# 🚀 Pornhub Bot Deployment Guide

This guide will help you deploy your Telegram bot with Pornhub integration on various hosting platforms.

## 📋 Prerequisites

### Required Software
- **Node.js** 18+ (for the bot)
- **Python** 3.8+ (for the Pornhub API)
- **npm** or **yarn** (for Node.js packages)
- **pip** (for Python packages)

### Required Packages

#### Node.js Dependencies
```bash
npm install
```

#### Python Dependencies
```bash
pip install pornhub-api aiohttp httpx
```

## 🌐 Platform-Specific Deployment

### 1. **Heroku Deployment**

#### Requirements
Create `requirements.txt` in your project root:
```txt
pornhub-api>=0.2.0
aiohttp>=3.8.0
httpx>=0.24.0
```

#### Procfile
Create `Procfile` in your project root:
```
worker: node telegram-index.js
```

#### Runtime
Create `runtime.txt` for Python version:
```
python-3.11.6
```

#### Buildpacks
Add these buildpacks in order:
1. `heroku/python`
2. `heroku/nodejs`

#### Deploy Commands
```bash
git add .
git commit -m "Deploy bot"
git push heroku main
```

### 2. **Railway Deployment**

#### railway.json
```json
{
  "build": {
    "builder": "nixpacks"
  },
  "deploy": {
    "startCommand": "node telegram-index.js"
  }
}
```

#### Environment Setup
- Railway auto-detects Node.js and Python
- Add your environment variables in Railway dashboard
- Deploy via GitHub connection

### 3. **DigitalOcean App Platform**

#### .do/app.yaml
```yaml
name: pornhub-bot
services:
- name: bot
  source_dir: /
  github:
    repo: your-username/your-repo
    branch: main
  run_command: node telegram-index.js
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: TELEGRAM_BOT_TOKEN
    value: YOUR_BOT_TOKEN
```

### 4. **VPS/Linux Server**

#### Install Dependencies
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python 3 and pip
sudo apt install python3 python3-pip -y

# Install PM2 for process management
sudo npm install -g pm2
```

#### Setup Bot
```bash
# Clone your repository
git clone https://github.com/your-username/your-repo.git
cd your-repo

# Install Node.js dependencies
npm install

# Install Python dependencies
pip3 install pornhub-api aiohttp httpx

# Set environment variables
export TELEGRAM_BOT_TOKEN="your_bot_token"

# Start with PM2
pm2 start telegram-index.js --name "pornhub-bot"
pm2 startup
pm2 save
```

### 5. **Docker Deployment**

#### Dockerfile
```dockerfile
FROM node:18-slim

# Install Python
RUN apt-get update && apt-get install -y python3 python3-pip

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY requirements.txt ./

# Install dependencies
RUN npm install
RUN pip3 install -r requirements.txt

# Copy source code
COPY . .

# Expose port (if needed)
EXPOSE 3000

# Start the bot
CMD ["node", "telegram-index.js"]
```

#### requirements.txt
```txt
pornhub-api>=0.2.0
aiohttp>=3.8.0
httpx>=0.24.0
```

#### Docker Commands
```bash
# Build image
docker build -t pornhub-bot .

# Run container
docker run -e TELEGRAM_BOT_TOKEN="your_token" pornhub-bot
```

## 🔧 Environment Variables

Set these environment variables on your hosting platform:

```env
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
NODE_ENV=production
```

## 🧪 Testing Deployment

### Pre-deployment Checklist
1. ✅ Test locally first
2. ✅ Verify Python dependencies are installed
3. ✅ Check environment variables are set
4. ✅ Test bot commands work
5. ✅ Verify all files are included in deployment

### Post-deployment Testing
```bash
# Test Python integration
python3 -c "import pornhub_api; print('✅ pornhub-api works')"

# Test bot startup
node telegram-index.js
```

## 🚨 Common Issues & Solutions

### Issue: "ModuleNotFoundError: No module named 'pornhub_api'"
**Solution:**
```bash
pip3 install pornhub-api
# or for Heroku/Railway: add to requirements.txt
```

### Issue: "Python command not found"
**Solution:**
- Install Python 3.8+
- Ensure Python is in PATH
- Try using `python3` instead of `python`

### Issue: Bot doesn't respond
**Solution:**
1. Check bot token is correct
2. Verify webhook/polling settings
3. Check server logs for errors

### Issue: "Permission denied" on VPS
**Solution:**
```bash
sudo chown -R $USER:$USER /path/to/bot
chmod +x telegram-index.js
```

## 📊 Monitoring & Maintenance

### Log Management
```bash
# PM2 logs
pm2 logs pornhub-bot

# Docker logs
docker logs container_name

# Check Python script directly
python3 pornhub-bot.py categories
```

### Health Checks
- Monitor bot uptime
- Check Python dependencies regularly
- Update packages when needed
- Monitor API rate limits

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit tokens to code
2. **HTTPS**: Use secure connections
3. **Firewall**: Configure proper port access
4. **Updates**: Keep dependencies updated
5. **Logs**: Don't log sensitive information

## 📚 Platform-Specific Resources

- **Heroku**: [Node.js Buildpack](https://devcenter.heroku.com/articles/nodejs-support)
- **Railway**: [Deploy Guide](https://docs.railway.app/deploy/deployments)
- **DigitalOcean**: [App Platform Docs](https://docs.digitalocean.com/products/app-platform/)
- **Docker**: [Node.js Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp)

---

**🎉 Your bot is now ready for production deployment!**

The bot will automatically detect the correct Python installation and work on any platform where both Node.js and Python are available. 