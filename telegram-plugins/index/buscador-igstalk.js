import fetch from 'node-fetch';

let handler = async (m, { bot, text, usedPrefix, command }) => {
  if (!text) {
    return bot.reply(m.chat, `🚩 Por favor, ingrese un nombre de usuario para buscar.\n\nEjemplo:\n> *${usedPrefix + command}* xrljose`, m, {});
  }

  await bot.sendMessage(m.chat, '🕓 Buscando perfil de Instagram...', { reply_to_message_id: m.id });
  try {
    const res = await fetch(`https://delirius-apiofc.vercel.app/tools/igstalk?username=${encodeURIComponent(text)}`);
    const json = await res.json();

    if (!json.data) {
      return await bot.sendMessage(m.chat, '❌ No se encontraron resultados para esta búsqueda.', { reply_to_message_id: m.id });
    }

    const user = json.data;
    let txt = `📌 *I N S T A G R A M  -  S T A L K*\n\n`;
    txt += `👤 *Nombre Completo:* ${user.full_name}\n`;
    txt += `🔖 *Usuario:* ${user.username}\n`;
    txt += `📜 *Bio:* ${user.biography || 'Sin descripción'}\n`;
    txt += `👥 *Seguidores:* ${user.followers}\n`;
    txt += `🔄 *Siguiendo:* ${user.following}\n`;
    txt += `📝 *Publicaciones:* ${user.posts}\n`;
    txt += `🔗 *Perfil:* ${user.url}\n\n`;

    await bot.sendPhoto(m.chat, user.profile_picture, {
      caption: txt,
      reply_to_message_id: m.id
    });
  } catch (error) {
    console.error(error);
    await bot.sendMessage(m.chat, '⚠️ Hubo un error al procesar la solicitud. Intenta de nuevo más tarde.', { reply_to_message_id: m.id });
  }
};

handler.help = ['igstalk *<nombre>*'];
handler.tags = ['stalk'];
handler.command = ['igstalk', 'instagramstalk'];

export default handler;