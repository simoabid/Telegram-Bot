
const emojiAdd = '✅'; // Emoji para agregar owner
const emojiRemove = '❌'; // Emoji para eliminar owner
const emojiWarning = '⚠️'; // Emoji de advertencia

const handler = async (m, { bot, text, args, usedPrefix, command}) => {
  const why = `${emojiWarning} Por favor, menciona a un usuario para agregar o quitar como owner.`;
  const who = m.mentionedJid[0]? m.mentionedJid[0]: m.quoted? m.quoted.sender: text? text.replace(/[^0-9]/g, '') + '': false;

  if (!who) return bot.sendMessage(m.chat, why, { reply_to_message_id: m.id });

  switch (command) {
    case 'addowner':
      global.owner.push([who]);
      await bot.sendMessage(m.chat, `${emojiAdd} Listo, el usuario ha sido agregado a la lista de owners.`, { reply_to_message_id: m.id });
      break;

    case 'delowner':
      const index = global.owner.findIndex(owner => owner[0] === who);

      if (index!== -1) {
        global.owner.splice(index, 1);
        await bot.sendMessage(m.chat, `${emojiRemove} El número ha sido eliminado correctamente de la lista de owners.`, { reply_to_message_id: m.id });
} else {
        await bot.sendMessage(m.chat, `${emojiWarning} El número no está en la lista de owners.`, { reply_to_message_id: m.id });
}
      break;
}
};

handler.command = ['addowner', 'delowner'];
handler.rowner = true;

export default handler;