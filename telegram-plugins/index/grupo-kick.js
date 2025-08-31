let handler = async (m, { bot, participants, isBotAdmin, isAdmin, args }) => {
  if (!m.isGroup) return bot.sendMessage(m.chat, '❗ *Este comando solo funciona en grupos.*', { reply_to_message_id: m.id });
  if (!isAdmin) return bot.sendMessage(m.chat, '🚫 *Solo los admins pueden usar este comando, fiera.*', { reply_to_message_id: m.id });
  if (!isBotAdmin) return bot.sendMessage(m.chat, '😥 *No puedo eliminar a nadie si no soy admin.*', { reply_to_message_id: m.id });

  let users = [];

  if (m.mentionedJid?.length) {
    users = m.mentionedJid;
  } else if (m.quoted?.sender) {
    users = [m.quoted.sender];
  } else if (args[0]) {
    let jid = args[0].replace(/[^0-9]/g, '') + '';
    users = [jid];
  }

  if (!users.length) {
    return bot.sendMessage(m.chat, '👀 *Etiqueta o responde al mensaje de quien quieras eliminar, no adivino...*', { reply_to_message_id: m.id });
  }

  for (let user of users) {
    if (user === bot.user.id) {
      bot.sendMessage(m.chat, `😅 *¿Quieres que me elimine a mí mismo? Eso no se puede.*`, { reply_to_message_id: m.id });
      continue;
    }

    try {
      // Use Telegram's kickChatMember method
      await bot.kickChatMember(m.chat, user);
      await bot.sendMessage(m.chat, `👢 *Usuario ${user} fue eliminado del grupo...*\n\n✨ _Desarrollado por Barboza🌀_`, { reply_to_message_id: m.id });
    } catch (error) {
      console.error('Error kicking user:', error);
      await bot.sendMessage(m.chat, `❌ *No se pudo eliminar al usuario. Verifica que tenga permisos de administrador.*`, { reply_to_message_id: m.id });
    }
  }

  await bot.sendMessage(m.chat, '✅ Comando ejecutado');
};

handler.help = ['kick', 'ban'];
handler.tags = ['group'];
handler.command = /^(kick|ban|echar|sacar)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;