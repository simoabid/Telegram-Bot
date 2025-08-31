import fs from 'fs'
import chalk from 'chalk'
import { createInterface } from 'readline'

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

console.log(chalk.blue('🤖 Sasuke Bot Telegram Setup'));
console.log(chalk.yellow('Setting up your converted Telegram bot...\n'));

async function setup() {
  try {
    // Check if config file exists
    if (!fs.existsSync('./telegram-config.js')) {
      console.log(chalk.red('❌ telegram-config.js not found!'));
      process.exit(1);
    }

    console.log(chalk.green('✅ Configuration file found'));
    
    // Ask for bot token
    console.log(chalk.cyan('\n📱 Step 1: Telegram Bot Token'));
    console.log('To get your bot token:');
    console.log('1. Message @BotFather on Telegram');
    console.log('2. Send /newbot');
    console.log('3. Choose a name and username for your bot');
    console.log('4. Copy the token you receive\n');
    
    const token = await question('Enter your Telegram bot token: ');
    
    if (!token || token.trim() === '') {
      console.log(chalk.red('❌ No token provided!'));
      process.exit(1);
    }
    
    // Validate token format
    if (!token.match(/^\d+:[A-Za-z0-9_-]+$/)) {
      console.log(chalk.yellow('⚠️  Token format looks incorrect. Expected format: 123456789:ABCdefGHIjklMNOpqrsTUVwxyz'));
      const proceed = await question('Continue anyway? (y/n): ');
      if (proceed.toLowerCase() !== 'y') {
        process.exit(1);
      }
    }
    
    // Update config file
    let config = fs.readFileSync('./telegram-config.js', 'utf8');
    config = config.replace('YOUR_BOT_TOKEN_HERE', token);
    fs.writeFileSync('./telegram-config.js', config);
    
    console.log(chalk.green('✅ Bot token saved to config file'));
    
    // Ask for owner ID
    console.log(chalk.cyan('\n👑 Step 2: Bot Owner Setup'));
    console.log('To get your Telegram user ID:');
    console.log('1. Message @userinfobot on Telegram');
    console.log('2. It will reply with your user ID\n');
    
    const ownerId = await question('Enter your Telegram user ID (optional, press Enter to skip): ');
    
    if (ownerId && ownerId.trim() !== '') {
      // Update owner in config
      config = fs.readFileSync('./telegram-config.js', 'utf8');
      config = config.replace('123456789', ownerId);
      fs.writeFileSync('./telegram-config.js', config);
      console.log(chalk.green('✅ Owner ID updated'));
    }
    
    // Check if plugins are converted
    console.log(chalk.cyan('\n🔌 Step 3: Plugin Verification'));
    
    if (!fs.existsSync('./telegram-plugins/index')) {
      console.log(chalk.yellow('⚠️  Telegram plugins directory not found. Converting plugins...'));
      
      // Import and run converter
      const { convertAllPlugins } = await import('./convert-plugins.js');
      convertAllPlugins();
      
      console.log(chalk.green('✅ Plugins converted successfully'));
    } else {
      const pluginCount = fs.readdirSync('./telegram-plugins/index').filter(f => f.endsWith('.js')).length;
      console.log(chalk.green(`✅ Found ${pluginCount} converted plugins`));
    }
    
    // Create environment file
    console.log(chalk.cyan('\n🔧 Step 4: Environment Setup'));
    
    const envContent = `# Telegram Bot Configuration
TELEGRAM_BOT_TOKEN="${token}"

# Optional: Set to true for development
NODE_ENV=production

# Optional: Custom port
PORT=3000
`;
    
    fs.writeFileSync('.env', envContent);
    console.log(chalk.green('✅ Environment file created'));
    
    // Final instructions
    console.log(chalk.green('\n🎉 Setup Complete!'));
    console.log(chalk.white('\nTo start your Telegram bot:'));
    console.log(chalk.cyan('npm run telegram'));
    console.log(chalk.white('or'));
    console.log(chalk.cyan('npm run tg'));
    
    console.log(chalk.white('\nTo test your bot:'));
    console.log('1. Start the bot with the command above');
    console.log('2. Find your bot on Telegram');
    console.log('3. Send /start or /menu');
    
    console.log(chalk.white('\nAvailable commands:'));
    console.log('• /menu - Show main menu');
    console.log('• /ping - Test bot response');
    console.log('• /help - Get help');
    console.log('• All original WhatsApp commands work!');
    
    console.log(chalk.yellow('\n📚 For more information, check TELEGRAM-README.md'));
    
    const startNow = await question('\nStart the bot now? (y/n): ');
    
    if (startNow.toLowerCase() === 'y') {
      console.log(chalk.blue('\n🚀 Starting Telegram bot...'));
      
      // Import and start the bot
      const { spawn } = await import('child_process');
      const child = spawn('node', ['telegram-index.js'], { 
        stdio: 'inherit',
        cwd: process.cwd()
      });
      
      child.on('exit', (code) => {
        console.log(chalk.yellow(`\nBot exited with code ${code}`));
      });
      
    } else {
      console.log(chalk.blue('\n👍 Setup complete! Run "npm run telegram" when ready.'));
    }
    
  } catch (error) {
    console.error(chalk.red('\n❌ Setup failed:'), error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Run setup
setup();
