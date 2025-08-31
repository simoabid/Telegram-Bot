import 'dotenv/config'
import { join, dirname } from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { watchFile, unwatchFile, existsSync, mkdirSync } from 'fs';
import cfonts from 'cfonts';
import { createInterface } from 'readline';
import yargs from 'yargs';
import chalk from 'chalk';
import { spawn } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const { name, description, author, version } = require(join(__dirname, './package.json'));
const { say } = cfonts;
const rl = createInterface(process.stdin, process.stdout);

function verify() {
  const dirs = ['tmp', 'telegram-plugins', 'telegram-plugins/index'];
  for (const dir of dirs) {
    if (typeof dir === 'string' && dir.trim() !== '') {
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
    } else {
      console.warn('Ruta inválida o no definida:', dir);
    }
  }
}
verify();

// Diseño para "Sasuke Bot Telegram"
say('sᥲsᥙkᥱ ᑲ᥆𝗍 TG', {
  font: 'block', // Estilo 'block' para un diseño fuerte
  align: 'center',
  colors: ['blue', 'white'], // Colores de Telegram
  background: 'black' // Fondo oscuro para resaltar el texto
});

say(`Telegram Bot • sᥲsᥙkᥱ ᑲ᥆𝗍 mძ`, {
  font: 'console',
  align: 'center',
  colors: ['cyan']
});

console.log(chalk.yellow('🤖 Starting Telegram Bot Version...'));
console.log(chalk.blue('📱 Converted from WhatsApp to Telegram'));
console.log(chalk.green('🚀 All functionality preserved!'));

let isRunning = false;
let child;

function start(file) {
  if (isRunning) return;
  isRunning = true;

  const args = [join(__dirname, file), ...process.argv.slice(2)];
  child = spawn('node', args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] });

  child.on('message', data => {
    switch (data) {
      case 'reset':
        child.kill();
        isRunning = false;
        start(file);
        break;
      case 'uptime':
        child.send(process.uptime());
        break;
    }
  });

  child.on('exit', (code) => {
    isRunning = false;
    console.error('🚩 Error :\n', code);
    process.exit();
  });

  const opts = yargs(process.argv.slice(2)).exitProcess(false).parse();
  if (!opts['test']) {
    if (!rl.listenerCount('line')) {
      rl.on('line', line => {
        if (child && child.connected) {
          child.send(line.trim());
        }
      });
    }
  }

  watchFile(args[0], () => {
    unwatchFile(args[0]);
    if (child) child.kill();
    isRunning = false;
    start(file);
  });
}

process.on('warning', (warning) => {
  if (warning.name === 'MaxListenersExceededWarning') {
    console.warn('🚩 Se excedió el límite de Listeners en :');
    console.warn(warning.stack);
  }
});

// Check if bot token is set
if (!process.env.TELEGRAM_BOT_TOKEN) {
  console.log(chalk.red('\n❌ TELEGRAM BOT TOKEN NOT SET!'));
  console.log(chalk.yellow('Please set your Telegram bot token:'));
  console.log(chalk.white('1. Get token from @BotFather on Telegram'));
  console.log(chalk.white('2. Set environment variable: TELEGRAM_BOT_TOKEN=your_token'));
  console.log(chalk.white('3. Or edit telegram-config.js file'));
  console.log(chalk.cyan('\nExample:'));
  console.log(chalk.gray('export TELEGRAM_BOT_TOKEN="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"'));
  console.log(chalk.gray('npm start'));
  
  process.exit(1);
}

console.log(chalk.green('\n✅ Bot token found, starting...'));
start('telegram-main.js');
