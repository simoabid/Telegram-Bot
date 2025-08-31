import fetch from 'node-fetch';
import GIFBufferToVideoBuffer from '../lib/Gifbuffer.js';

const getBuffer = async (url) => {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer);
  } catch (error) {
    console.error("Error al obtener el buffer", error);
    throw new Error("Error al obtener el buffer");
  }
}

const translateGoogle = async (text, sourceLang, targetLang) => {
  const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`);
  const result = await response.json();
  return result[0][0][0];
}

const commandMapping = {
  'acosar': 'bully',
  'abrazar': 'cuddle',
  'llorar': 'cry',
  'abrazar': 'hug',
  'awoo': 'awoo',
  'besar': 'kiss',
  'lamer': 'lick',
  'acariciar': 'pat',
  'engreído': 'smug',
  'golpear': 'bonk',
  'lanzar': 'yeet',
  'ruborizarse': 'blush',
  'sonreír': 'smile',
  'saludar': 'wave',
  'chocar': 'highfive',
  'sostener': 'handhold',
  'morder': 'bite',
  'glomp': 'glomp',
  'abofetear': 'slap',
  'matar': 'kill',
  'feliz': 'happy',
  'guiñar': 'wink',
  'tocar': 'poke',
  'bailar': 'dance',
  'cringe': 'cringe'
};

let handler = async (m, { bot, args, usedPrefix, command }) => {
  try {
    let target;

    // For Telegram, we need to handle mentions differently
    if (m.isGroup) {
      // Try to get mentioned user from message entities or quoted message
      if (m.entities && m.entities.length > 0) {
        const mention = m.entities.find(entity => entity.type === 'mention');
        target = mention ? mention.user : null;
      } else if (m.reply_to_message) {
        target = m.reply_to_message.from.id;
      } else {
        target = null;
      }
    } else {
      target = m.chat.id;
    }

    if (!target) {
      await bot.sendMessage(m.chat.id, `Por favor, etiqueta o menciona a alguien\n\nEjemplo: ${usedPrefix + command} @usuario`, {
        reply_to_message_id: m.message_id
      });
      return;
    }

    let senderName = bot.getName(m.from.id);
    let targetName = bot.getName(target);

    let englishCommand = commandMapping[command.toLowerCase()];

    if (!englishCommand) {
      await bot.sendMessage(m.chat.id, `El comando '${command}' no está soportado.`, {
        reply_to_message_id: m.message_id
      });
      return;
    }

    let reaction = await fetch(`https://api.waifu.pics/sfw/${englishCommand}`);
    if (!reaction.ok) {
      await bot.sendMessage(m.chat.id, "Reacción no encontrada", {
        reply_to_message_id: m.message_id
      });
      return;
    }

    let json = await reaction.json();
    let { url } = json;
    const gifBuffer = await getBuffer(url);
    const gifToVideoBuffer = await GIFBufferToVideoBuffer(gifBuffer);

    let translatedCommand = await translateGoogle(englishCommand, 'en', 'es');

    // Send as video with caption for Telegram
    await bot.sendVideo(m.chat.id, gifToVideoBuffer, {
      caption: `(${senderName}) ${translatedCommand} ${targetName}`,
      reply_to_message_id: m.message_id
    });

  } catch (error) {
    console.error('Error in fun-reacciones:', error);
    await bot.sendMessage(m.chat.id, 'Error al procesar la reacción. Intenta de nuevo más tarde.', {
      reply_to_message_id: m.message_id
    });
  }
}

handler.tags = ['fun','anime'];
handler.help = [
  'acosar @usuario',
  'abrazar @usuario',
  'llorar @usuario',
  'abrazar @usuario',
  'awoo @usuario',
  'besar @usuario',
  'lamer @usuario',
  'acariciar @usuario',
  'engreído @usuario',
  'golpear @usuario',
  'lanzar @usuario',
  'ruborizarse @usuario',
  'sonreír @usuario',
  'saludar @usuario',
  'chocar @usuario',
  'sostener @usuario',
  'morder @usuario',
  'glomp @usuario',
  'abofetear @usuario',
  'matar @usuario',
  'feliz @usuario',
  'guiñar @usuario',
  'tocar @usuario',
  'bailar @usuario',
  'cringe @usuario'
];

handler.command = /^(acosar|abrazar|llorar|abrazar|awoo|besar|lamer|acariciar|engreído|golpear|lanzar|ruborizarse|sonreír|saludar|chocar|sostener|morder|glomp|abofetear|matar|feliz|guiñar|tocar|bailar|cringe)$/i;
handler.group = true;

export default handler;