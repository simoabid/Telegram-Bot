
let handler = async (m, { bot, usedPrefix, command, args, isOwner, isAdmin, isROwner }) => {
  let isEnable = /true|enable|(turn)?on|1/i.test(command);
  let chat = global.db.data.chats[m.chat];
  let user = global.db.data.users[m.sender];
  let botSettings = global.db.data.settings[bot.user.id] || {};
  let type = (args[0] || '').toLowerCase();
  let isAll = false, isUser = false;

  switch (type) {
    case 'welcome':
    case 'bv':
    case 'bienvenida':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, bot);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, bot);
        throw false;
      }
      chat.bienvenida = isEnable;
      break;

    case 'antiprivado2':
  if (!m.isGroup) {
    if (!isOwner) {
      global.dfail('group', m, bot);
      throw false;
}
} else if (!isAdmin) {
    global.dfail('admin', m, bot);
    throw false;
}
  chat.antiPrivate2 = isEnable;
  break;

    case 'antilag':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, bot);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, bot);
        throw false;
      }
      chat.antiLag = isEnable;
      break;

    case 'autoread':
    case 'autoleer':
      isAll = true;
      if (!isROwner) {
        global.dfail('rowner', m, bot);
        throw false;
      }
      global.opts['autoread'] = isEnable;
      break;

    case 'antispam':
      isAll = true;
      if (!isOwner) {
        global.dfail('owner', m, bot);
        throw false;
      }
      bot.antiSpam = isEnable;
      break;

     case 'antinopor':
      isAll = true;
      if (!isOwner) {
        global.dfail('owner', m, bot);
        throw false;
      }
      chat.antiLinkxxx = isEnable;
      break;

    case 'audios':
    case 'audiosbot':
    case 'botaudios':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, bot);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, bot);
        throw false;
      }
      chat.audios = isEnable;
      break;

    case 'detect':
    case 'avisos':
      if (!m.isGroup) {
        if (!isOwner) {
          global.dfail('group', m, bot);
          throw false;
        }
      } else if (!isAdmin) {
        global.dfail('admin', m, bot);
        throw false;
      }
      chat.detect = isEnable;
      break;

    case 'jadibotmd':
    case 'serbot':
    case 'subbots':
      isAll = true;
      if (!isOwner) {
        global.dfail('rowner', m, bot);
        throw false;
      }
      bot.jadibotmd = isEnable;
      break;

    case 'restrict':
    case 'restringir':
      isAll = true;
      if (!isOwner) {
        global.dfail('rowner', m, bot);
        throw false;
      }
      bot.restrict = isEnable;
      break;

    case 'document':
    case 'documento':
      isUser = true;
      user.useDocument = isEnable;
      break;

    case 'antilink':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, bot);
          throw false;
        }
      }
      chat.antiLink = isEnable;
      break;

    case 'antibot':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, bot);
          throw false;
        }
      }
      chat.antiBot = isEnable;
      break;

    case 'modoadmin':
    case 'soloadmin':
    case 'modeadmin':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, bot);
          throw false;
        }
      }
      chat.modoadmin = isEnable;
      break;

    case 'antiprivado':
      // Ahora cualquiera puede activarlo o desactivarlo
      bot.antiPrivate = isEnable;
      break;

    case 'nsfw':
    case 'modohorny':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, bot);
          throw false;
        }
      }
      chat.nsfw = isEnable;
      break;

    case 'antiarabes':
    case 'antinegros':
    case 'antifakes':
    case 'onlylatinos':
      if (m.isGroup) {
        if (!(isAdmin || isOwner)) {
          global.dfail('admin', m, bot);
          throw false;
        }
      }
      chat.onlyLatinos = isEnable;
      break;

    default:
      if (!/[01]/.test(command)) return m.reply(`
*🧑‍💻 INGRESE UNA OPCIÓN PARA ACTIVAR O DESACTIVAR*

*🔖 LISTA DE OPCIONES*
*Tipo :* welcome
*Descripción :* Des/Activa la *Bienvenida* y *Despedida* para Grupos

*Tipo :* nsfw 
*Descripción :* Des/Activa los comandos *NSFW* para Grupos

*Tipo :* antilag
*Descripción :* Des/Activa el *AntiLag* en un grupo*
*Tipo :* antiarabes 
*Descripción :* Des/Activa el *AntiArabes* para Grupos

*Tipo :* antilink 
*Descripción :* Des/Activa el *AntiLink* para Grupos

*Tipo :* autoread 
*Descripción :* Des/Activa el *AutoRead* para el Bot

*Tipo :* restrict
*Description :* Des/Activa el *Restrict*
para el bot

*Tipo :* document 
*Descripción :* Des/Activa la *Descarga En Documentos* para el Usuario

*Tipo :* modoadmin
*Descripción :* Des/Activa la *modoadmin* para el Usuario

*Tipo :* audios
*Descripción :* Des/Activa la *audios* para el Usuario

*Tipo :* subbots
*Descripción :* Des/Activa la *subbots* para el Usuario


*• Ejemplo:*
*- ${usedPrefix + command}* welcome
`.trim())
      throw false
  }

m.reply(`⚠️ *sᥲsᥙkᥱ ᑲ᥆𝗍 mძ 🌀 Notificación* ⚠️

💎 *Comando ejecutado:* *${type}*
👤 *Estado actual:* *${isEnable? 'Activado ✅': 'Desactivado ❌'}*
📍 *Ámbito:* ${isAll? '*Todo el Bot* 🌐': isUser? '*Usuario específico* 👥': '*Este Chat* 💬'}

🚀 *Muchas gracias por usar sᥲsᥙkᥱ ᑲ᥆𝗍 mძ 🌀*🎖️`)
}

handler.help = ['enable', 'disable', 'on', 'off']
handler.tags = ['nable']
handler.command = /^(enable|disable|on|off|1|0)$/i

export default handler
