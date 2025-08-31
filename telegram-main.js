process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'
import 'dotenv/config'
import './telegram-config.js';
import { createRequire } from 'module'
import path, { join } from 'path'
import {fileURLToPath, pathToFileURL} from 'url'
import { platform } from 'process'
import fs, { watchFile, unwatchFile, writeFileSync, readdirSync, statSync, unlinkSync, existsSync, readFileSync, copyFileSync, watch, rmSync, readdir, stat, mkdirSync, rename, writeFile } from 'fs'
import yargs from 'yargs'
import { spawn } from 'child_process'
import lodash from 'lodash'
import chalk from 'chalk'
import syntaxerror from 'syntax-error'
import { tmpdir } from 'os'
import { format } from 'util'
import P from 'pino'
import pino from 'pino'
import Pino from 'pino'
import { makeTelegramBot } from './lib/telegram-simple.js'
import { telegramHandler } from './telegram-handler.js'
import {Low, JSONFile} from 'lowdb'
import { mongoDB, mongoDBV2 } from './lib/mongoDB.js'
import store from './lib/store.js'
import readline from 'readline'
import NodeCache from 'node-cache'

const { chain } = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000

global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
  return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString();
}; global.__dirname = function dirname(pathURL) {
  return path.dirname(global.__filename(pathURL, true));
}; global.__require = function require(dir = import.meta.url) {
  return createRequire(dir);
};

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({...query, ...(apikeyqueryname ? {[apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name]} : {})})) : '');

global.timestamp = {start: new Date};
global.videoList = [];
global.videoListXXX = [];

const __dirname = global.__dirname(import.meta.url);

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse());

// Handle prefix properly for Telegram
global.prefixes = ['.', '/', '#', '!'];
global.prefix = new RegExp('^[./#!]');

// Database setup
global.db = new Low(new JSONFile(`${global.opts._[0] ? global.opts._[0] + '_' : ''}${global.dbname}`));

global.DATABASE = global.db; 
global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) {
    return new Promise((resolve) => setInterval(async function() {
      if (!global.db.READ) {
        clearInterval(this);
        resolve(global.db.data == null ? global.loadDatabase() : global.db.data);
      }
    }, 1 * 1000));
  }
  if (global.db.data !== null) return;
  global.db.READ = true;
  await global.db.read().catch(console.error);
  global.db.READ = null;
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(global.db.data || {}),
  };
  global.db.chain = chain(global.db.data);
};

loadDatabase();

// ChatGPT database
global.chatgpt = new Low(new JSONFile(path.join(__dirname, './db/chatgpt.json')));
global.loadChatgptDB = async function loadChatgptDB() {
  if (global.chatgpt.READ) {
    return new Promise((resolve) => setInterval(async function() {
      if (!global.chatgpt.READ) {
        clearInterval(this);
        resolve(global.chatgpt.data == null ? global.loadChatgptDB() : global.chatgpt.data);
      }
    }, 1 * 1000));
  }
  if (global.chatgpt.data !== null) return;
  global.chatgpt.READ = true;
  await global.chatgpt.read().catch(console.error);
  global.chatgpt.READ = null;
  global.chatgpt.data = {
    users: {},
    ...(global.chatgpt.data || {}),
  };
  global.chatgpt.chain = chain(global.chatgpt.data);
};

loadChatgptDB();

// Telegram Bot Setup
if (!global.telegramBotToken || global.telegramBotToken === 'YOUR_BOT_TOKEN_HERE') {
  console.error(chalk.red('❌ TELEGRAM BOT TOKEN NOT SET!'));
  console.error(chalk.yellow('Please set your Telegram bot token in telegram-config.js'));
  console.error(chalk.yellow('Get your token from @BotFather on Telegram'));
  process.exit(1);
}

// Create Telegram bot instance
global.bot = makeTelegramBot(global.telegramBotToken, {polling: true});

global.bot.isInit = false;
global.bot.well = false;

console.log(chalk.yellow('🤖 Starting Telegram Bot...'));

// Bot event handlers
global.bot.on('polling_error', (error) => {
  console.error(chalk.red('Polling error:'), error);
});

global.bot.on('error', (error) => {
  console.error(chalk.red('Bot error:'), error);
});

// Message handler
global.bot.on('message', async (msg) => {
  if (!global.bot.isInit) {
    global.bot.isInit = true;
    console.log(chalk.green('✅ Telegram Bot Connected Successfully!'));
  }

  // Process message through handler
  await telegramHandler(msg);
});

// Plugin system
const pluginFolder = './telegram-plugins/index';
const pluginFilter = (filename) => /\.js$/.test(filename);
global.plugins = {};

console.log('📁 Plugin folder:', pluginFolder);

async function filesInit() {
  // Create telegram-plugins directory if it doesn't exist
  if (!existsSync('./telegram-plugins')) {
    mkdirSync('./telegram-plugins', { recursive: true });
  }

  if (!existsSync(pluginFolder)) {
    console.error('❌ Plugin folder not found:', pluginFolder);
    return;
  }

  const files = readdirSync(pluginFolder).filter(pluginFilter);
  console.log('📂 Found', files.length, 'plugin files');

  for (const filename of files) {
    try {
      const filePath = path.resolve(pluginFolder, filename);
      const fileUrl = pathToFileURL(filePath).href;
      const module = await import(fileUrl);
      global.plugins[filename] = module.default || module;
      console.log('✅ Loaded plugin:', filename);
    } catch (e) {
      console.error('❌ Error loading plugin', filename, ':', e.message);
      delete global.plugins[filename];
    }
  }

  console.log('🔌 Total plugins loaded:', Object.keys(global.plugins).length);
}

// Initialize plugins
filesInit().then((_) => Object.keys(global.plugins)).catch(console.error);

// Plugin hot reload
global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    const dir = global.__filename(join(pluginFolder, filename), true);
    if (filename in global.plugins) {
      if (existsSync(dir)) console.log(chalk.blue(` updated plugin - '${filename}'`));
      else {
        console.log(chalk.yellow(`deleted plugin - '${filename}'`));
        return delete global.plugins[filename];
      }
    } else console.log(chalk.green(`new plugin - '${filename}'`));
    const err = syntaxerror(readFileSync(dir), filename, {
      sourceType: 'module',
      allowAwaitOutsideFunction: true,
    });
    if (err) console.error(chalk.red(`syntax error while loading '${filename}'\n${format(err)}`));
    else {
      try {
        const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`));
        global.plugins[filename] = module.default || module;
      } catch (e) {
        console.error(chalk.red(`error require plugin '${filename}\n${format(e)}'`));
      } finally {
        global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)));
      }
    }
  }
};

// Watch for plugin changes
if (!global.opts['test']) {
  if (existsSync(pluginFolder)) {
    for (const filename of readdirSync(pluginFolder).filter(pluginFilter)) {
      const file = global.__filename(join(pluginFolder, filename));
      watchFile(file, global.reload);
    }
  }
}

// Auto-save database
setInterval(async () => {
  if (global.db.data) await global.db.write().catch(console.error);
  if (global.chatgpt.data) await global.chatgpt.write().catch(console.error);
}, 30 * 1000);

console.log(chalk.green('🚀 Telegram Bot is ready!'));
