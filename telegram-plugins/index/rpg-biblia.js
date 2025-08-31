// Bible Search - By Jose XrL 🔥
// Free Code Titans
// https://whatsapp.com/channel/0029ValMlRS6buMFL9d0iQ0S

import fetch from 'node-fetch';

let handler = async (m, { bot, command, text, usedPrefix }) => {
  if (!text) return bot.reply(m.chat, '🚩 Ingresa la referencia bíblica que deseas buscar.\n\nEjemplo:\n' + `> *${usedPrefix + command}* john 3:16`, m, {});

  await m.react('🕓');

  try {
    let res = await fetch(`https://api.davidcyriltech.my.id/bible?reference=${encodeURIComponent(text)}`);
    let json = await res.json();

    if (!json.success) {
      return bot.reply(m.chat, 'No se encontraron resultados para tu búsqueda.', m);
    }

    let txt = '`乂  B Í B L I A  -  B Ú S Q U E`';
    txt += `\n\n  *» Referencia* : ${json.reference}\n`;
    txt += `  *» Traducción* : ${json.translation}\n`;
    txt += `  *» Contenido* : ${json.text.trim()}\n`;

    await bot.reply(m.chat, txt, m, {});
    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('✖️');
  }
}

handler.help = ['biblia *<referencia>*'];
handler.tags = ['search'];
handler.command = ['biblia'];
handler.register = false;

export default handler;