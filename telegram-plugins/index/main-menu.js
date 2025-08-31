import { xpRange } from '../lib/levelling.js';
import axios from 'axios';

const clockString = ms => {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
};

const saludarSegunHora = () => {
  const hora = new Date().getHours();
  if (hora >= 5 && hora < 12) return '🌄 Buenos días';
  if (hora >= 12 && hora < 19) return '🌞 Buenas tardes';
  return '🌙 Buenas noches';
};

const img = 'https://cdn-sunflareteam.vercel.app/images/fe2072569a.jpg';

const sectionDivider = '╰━━━━━━━━━━━━━━━━━━⭓';

const menuFooter = `
╭─❒ 「📌 INFO FINAL」
│ ⚠️ Usa los comandos con el prefijo correspondiente
│ 📌 Ejemplo:/ping | /menu
│ 🛡️ Creado por Barboza-Team
╰❒
`.trim();

const handler = async (m, { bot, usedPrefix }) => {
  try {
    const saludo = saludarSegunHora();
    const user = global.db.data.users[m.sender] || { level: 1, exp: 0, limit: 5 };
    const { exp, level, limit } = user;
    const { min, xp } = xpRange(level, global.multiplier || 1);
    const totalUsers = Object.keys(global.db.data.users).length;
    const mode = global.opts?.self ? 'Privado 🔒' : 'Público 🌐';
    const uptime = clockString(process.uptime() * 1000);
    const userName = m.from.first_name + (m.from.last_name ? ' ' + m.from.last_name : '');
    const tagUsuario = `@${m.from.username || m.sender}`;

    const text = [
      "*Etiqueta General X Sasuke*",
      "𝙈𝙚𝙣𝙘𝙞𝙤𝙣 𝙂𝙚𝙣𝙚𝙧𝙖𝙡",
      "𝙀𝙩𝙞𝙦𝙪𝙚𝙩𝙖𝙣𝙙𝙤 𝙖 𝙡𝙤𝙨 𝙉𝙋𝘾"
    ].getRandom();
    const imgRandom = [
      "https://iili.io/FKVDVAN.jpg",
      "https://iili.io/FKVbUrJ.jpg"
    ].getRandom();

    // --- Inicio del código arreglado ---
    let thumbnailBuffer;
    try {
      const response = await axios.get(imgRandom, { responseType: 'arraybuffer' });
      thumbnailBuffer = Buffer.from(response.data);
    } catch (e) {
      console.error('❌ Error al descargar la imagen para el quoted:', e);
      // Usar una imagen de respaldo o un buffer vacío si falla
      // Si usas un buffer vacío, asegúrate de que el resto del código lo maneje.
      thumbnailBuffer = Buffer.from('');
    }
    // --- Fin del código arreglado ---

    const izumi = {
      key: { participants: "0", fromMe: false, id: "Halo" },
      message: {
        locationMessage: {
          name: text,
          jpegThumbnail: thumbnailBuffer,
          vcard:
            "BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\n" +
            "item1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\n" +
            "X-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD"
        }
      },
      participant: "0"
    };
    // --- Fin del código agregado ---

    let categorizedCommands = {};
    Object.values(global.plugins)
      .filter(p => p?.help && !p.disabled)
      .forEach(p => {
        const tag = Array.isArray(p.tags) ? p.tags[0] : p.tags || 'Otros';
        const cmds = Array.isArray(p.help) ? p.help : [p.help];
        categorizedCommands[tag] = categorizedCommands[tag] || new Set();
        cmds.forEach(cmd => categorizedCommands[tag].add('/' + cmd));
      });

    const categoryEmojis = {
      // Main categories
      anime: '🎭', info: 'ℹ️', search: '🔎', diversión: '🎉', subbots: '🤖',
      rpg: '🌀', registro: '📝', sticker: '🎨', imagen: '🖼️', logo: '🖌️',
      premium: '🎖️', configuración: '⚙️', descargas: '📥', herramientas: '🛠️',
      nsfw: '🔞', 'base de datos': '📀', audios: '🔊', freefire: '🔥', otros: '🪪',

      // Additional categories from plugins
      main: '🏠', dl: '📥', downloader: '📥', downloads: '📥', download: '📥',
      internet: '🌐', buscador: '🔍', search: '🔎', tools: '🛠️', tool: '🛠️',
      game: '🎮', games: '🎮', juegos: '🎮', fun: '🎉', entretenimiento: '🎪',
      group: '👥', grupos: '👥', admin: '👑', owner: '👑', propietario: '👑',
      ai: '🤖', ia: '🤖', artificial: '🤖', bot: '🤖',
      media: '📱', multimedia: '📱', convert: '🔄', convertir: '🔄',
      economy: '💰', economía: '💰', coins: '🪙', monedas: '🪙',
      level: '📊', nivel: '📊', exp: '⭐', experiencia: '⭐',
      random: '🎲', aleatorio: '🎲', meme: '😂', memes: '😂',
      music: '🎵', música: '🎵', audio: '🔊', sound: '🔊',
      video: '🎬', videos: '🎬', movie: '🎬', películas: '🎬',
      social: '📱', redes: '📱', instagram: '📷', tiktok: '🎵', youtube: '📺',
      utility: '⚙️', utilidad: '⚙️', misc: '🔧', varios: '🔧'
    };

    const menuBody = Object.entries(categorizedCommands).map(([title, cmds]) => {
      const emoji = categoryEmojis[title.toLowerCase()] || '📁';
      const list = [...cmds].map(cmd => `│ ◦ ${cmd}`).join('\n');
      return `╭─「 ${emoji} ${title.toUpperCase()} 」\n${list}\n${sectionDivider}`;
    }).join('\n\n');

    const header = `
${saludo} ${tagUsuario} 👋

╭─ 「 sᥲsᥙkᥱ ᑲ᥆𝗍 mძ 🌀 」
│ 👤 Nombre: ${userName}
│ 🎖 Nivel: ${level} | XP: ${exp - min}/${xp}
│ 🔓 Límite: ${limit}
│ 🧭 Modo: ${mode}
│ ⏱️ Tiempo activo: ${uptime}
│ 🌍 Usuarios registrados: ${totalUsers}
╰─❒
`.trim();

    const fullMenu = `${header}\n\n${menuBody}\n\n${menuFooter}`;

    // Fix: Use different variable name to avoid shadowing the bot parameter
    const botSettings = global.db.data.settings[bot.user?.id] || {}
    let bannerr = botSettings.banner || 'https://raw.githubusercontent.com/WillZek/CrowBot-ST/main/media/catalogo.jpg'

    // Check if the full menu is too long for Telegram (4096 character limit)
    if (fullMenu.length > 4000) {
      // Split menu into multiple messages
      const menuParts = [];
      const categories = Object.entries(categorizedCommands);
      let currentPart = header + '\n\n';

      for (let i = 0; i < categories.length; i++) {
        const [title, cmds] = categories[i];
        const emoji = categoryEmojis[title.toLowerCase()] || '📁';
        const list = [...cmds].map(cmd => `│ ◦ ${cmd}`).join('\n');
        const categorySection = `╭─「 ${emoji} ${title.toUpperCase()} 」\n${list}\n${sectionDivider}`;

        // Check if adding this category would exceed the limit
        if ((currentPart + categorySection + '\n\n' + menuFooter).length > 4000) {
          // Send current part and start a new one
          menuParts.push(currentPart.trim());
          currentPart = categorySection + '\n\n';
        } else {
          currentPart += categorySection + '\n\n';
        }
      }

      // Add the last part with footer
      if (currentPart.trim()) {
        currentPart += menuFooter;
        menuParts.push(currentPart.trim());
      }

      // Send all parts
      for (let i = 0; i < menuParts.length; i++) {
        const partHeader = i === 0 ? '' : `📋 **Menú Parte ${i + 1}/${menuParts.length}**\n\n`;
        await bot.sendMessage(m.chat, partHeader + menuParts[i], {
          reply_to_message_id: i === 0 ? m.id : undefined
        });

        // Small delay between messages to avoid rate limiting
        if (i < menuParts.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    } else {
      // Send full menu as single message
      await bot.sendMessage(m.chat, fullMenu, {
        reply_to_message_id: m.id
      });
    }

  } catch (e) {
    console.error('❌ Error al generar el menú:', e);
    await bot.reply(m.chat, '⚠️ Ocurrió un error al mostrar el menú.', m);
  }
};

handler.command = ['menu', 'help', 'menú'];
export default handler;
