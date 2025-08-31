import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import * as cheerio from 'cheerio';
import fetch from 'node-fetch'
import axios from 'axios'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

// TELEGRAM BOT TOKEN - Get this from @BotFather on Telegram
global.telegramBotToken = process.env.TELEGRAM_BOT_TOKEN || '7433764107:AAH_s4o0UeJy-rTvlrg3uieUDbiT4FLvkFE'

// Bot owners (Telegram user IDs)
global.owner = [
  [ '1538110126', 'Barboza OFC', true ],
  [ '987654321', 'Goku', true ],
  [ '555666777', 'Willzek', true ],
  [ '111222333', 'Rayo OFC', true ],
  [ '444555666', "I'm Fz ~", true ],
  [ '777888999', 'bajobots', true ],
  [ '123123123', "MediaHub",true ],
  [ '456456456', true ]
]

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.mods = []
global.prems = []

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.packname = 'sᥲsᥙkᥱ ᑲ᥆𝗍 mძ'
global.author = 'Barboza-Team'
global.wm = 'sᥲsᥙkᥱ ᑲ᥆𝗍 mძ'
global.titulowm = 'sᥲsᥙkᥱ ᑲ᥆𝗍 mძ'
global.titulowm2 = `sᥲsᥙkᥱ ᑲ᥆𝗍 mძ`
global.igfg = 'sᥲsᥙkᥱ ᑲ᥆𝗍 mძ'
global.wait = '*⌛ _Cargando..._*\n*▰▰▰▱▱▱▱▱*'

// Load images if they exist, otherwise use default
try {
  global.imagen1 = fs.readFileSync('./storage/img/Menu2.jpg')
} catch (e) {
  global.imagen1 = fs.readFileSync('./storage/img/catalogo.png')
}

try {
  global.imagen2 = fs.readFileSync('./storage/img/Menu1.jpg')
} catch (e) {
  global.imagen2 = fs.readFileSync('./storage/img/catalogo.png')
}

try {
  global.imagen3 = fs.readFileSync('./storage/img/Menu3.jpg')
} catch (e) {
  global.imagen3 = fs.readFileSync('./storage/img/catalogo.png')
}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.catalogo = fs.readFileSync('./storage/img/catalogo.png');

// Fake reply object for Telegram (simplified - no large data)
global.fake = {
  key: {
    fromMe: false,
    participant: '0',
    remoteJid: 'status@broadcast'
  },
  message: {
    orderMessage: {
      itemCount: 0,
      status: 1,
      surface: 1,
      message: packname,
      orderTitle: 'Telegram Bot',
      thumbnail: null, // Remove large image data
      sellerJid: '0'
    }
  }
};

global.estilo = global.fake;

// Add getRandom method to Array prototype for compatibility
if (!Array.prototype.getRandom) {
  Array.prototype.getRandom = function() {
    return this[Math.floor(Math.random() * this.length)];
  };
}

// Telegram channels (equivalent to WhatsApp channels)
global.ch = {
  ch1: '@your_telegram_channel1',
  ch2: '@your_telegram_channel2'
}

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.jadi = 'Sesiones/Subbots'
global.Sesion = 'Sesiones/Principal'
global.dbname = 'database.json'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.prefix = ['/', '.', '#', '!']
global.multiplier = 69
global.maxwarn = '2'

//*─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─⭒─ׄ─ׅ─ׄ─*

global.APIs = {
'https://api-alc.herokuapp.com': 'ConfuMods',
'https://api.reysekha.xyz': 'apirey',
'https://melcanz.com': 'F3bOrWzY',
'https://bx-hunter.herokuapp.com': 'Ikyy69',
'https://api.xteam.xyz': '5bd33b276d41d6b4',
'https://zahirr-web.herokuapp.com': 'zahirgans',
'https://bsbt-api-rest.herokuapp.com': 'benniismael',
'https://api.zeks.me': 'apivinz',
'https://hardianto-chan.herokuapp.com': 'hardianto',
'https://pencarikode.xyz': 'pais',
'https://api-fgmods.ddns.net': 'fg-dylux',
'https://leyscoders-api.herokuapp.com': 'MIMINGANZ',
'https://server-api-rey.herokuapp.com': 'apirey',
'https://api.lolhuman.xyz': 'GataDiosV2',
'https://botstyle-api.herokuapp.com': 'Eyar749L',
'https://neoxr-api.herokuapp.com': 'yntkts',
'https://anabotofc.herokuapp.com/': 'AnaBot'
}

global.APIKeys = {
'https://api-alc.herokuapp.com': 'ConfuMods',
'https://api.reysekha.xyz': 'apirey',
'https://melcanz.com': 'F3bOrWzY',
'https://bx-hunter.herokuapp.com': 'Ikyy69',
'https://api.xteam.xyz': '5bd33b276d41d6b4',
'https://zahirr-web.herokuapp.com': 'zahirgans',
'https://bsbt-api-rest.herokuapp.com': 'benniismael',
'https://api.zeks.me': 'apivinz',
'https://hardianto-chan.herokuapp.com': 'hardianto',
'https://pencarikode.xyz': 'pais',
'https://api-fgmods.ddns.net': 'fg-dylux',
'https://leyscoders-api.herokuapp.com': 'MIMINGANZ',
'https://server-api-rey.herokuapp.com': 'apirey',
'https://api.lolhuman.xyz': 'GataDiosV2',
'https://botstyle-api.herokuapp.com': 'Eyar749L',
'https://neoxr-api.herokuapp.com': 'yntkts',
'https://anabotofc.herokuapp.com/': 'AnaBot'
} 

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'telegram-config.js'"))
  import(`${file}?update=${Date.now()}`)
})
