import ws from "ws";

let handler = async (m, { bot, usedPrefix, args }) => {
  try {
    if (!args[0] && !m.quoted) {
      return m.reply(`⚠️ Menciona el número de un bot o responde al mensaje de un bot.\n> Ejemplo: *${usedPrefix}setprimary @0*`);
    }

    // Validación de global.bots para evitar errores de undefined
    const users = global.bots 
      ? [...new Set([...global.bots.filter(bot => bot?.user && bot?.ws?.socket && bot.ws.socket.readyState !== ws.CLOSED).map(bot => bot)])] 
      : [];

    let botJid;
    let selectedBot;

    if (m.mentionedJid && m.mentionedJid.length > 0) {
      botJid = m.mentionedJid[0];
    } else if (m.quoted) {
      botJid = m.quoted.sender;
    } else {
      botJid = args[0].replace(/[^0-9]/g, "") + "";
    }

    if (botJid === bot.user.jid || botJid === global.bot.user.jid) {
      selectedBot = bot;
    } else {
      selectedBot = users.find(bot => bot.user.jid === botJid);
    }

    if (!selectedBot) {
      return bot.reply(m.chat, `⚠️ @${botJid.split("@")[0]} no es un bot de la misma sesión. Verifica los bots conectados usando *#bots*.`, m, { mentions: [botJid] });
    }

    let chat = global.db?.data?.chats?.[m.chat];

    if (!chat) {
      return bot.reply(m.chat, "⚠️ No se pudo acceder a la base de datos del grupo.", m);
    }

    if (chat.primaryBot === botJid) {
      return bot.reply(m.chat, `⚠️ @${botJid.split("@")[0]} ya es el bot primario en este grupo.`, m, { mentions: [botJid] });
    }

    chat.primaryBot = botJid;
    bot.sendMessage(m.chat, {
      text: `✅ El bot @${botJid.split("@")[0]} ha sido establecido como primario en este grupo. Los demás bots no responderán aquí.`,
      mentions: [botJid]
    }, { quoted: m });

  } catch (error) {
    console.error("❌ Error en .setprimary:", error);
    m.reply("❌ Ocurrió un error al establecer el bot primario. Inténtalo nuevamente.");
  }
};

handler.help = ["setprimary <@tag>"];
handler.tags = ["jadibot"];
handler.command = ["setprimary"];
handler.group = true;
handler.admin = true;

export default handler;