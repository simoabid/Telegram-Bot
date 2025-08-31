
var handler = async (m, { bot, args }) => {
    if (!m.isGroup) return bot.sendMessage(m.chat, '🚩 Este comando solo se puede usar en grupos.', { reply_to_message_id: m.id })

    try {
        // Get group information using Telegram API
        const chat = await bot.getChat(m.chat);

        let groupInfo = `📋 *INFORMACIÓN DEL GRUPO*\n\n`;
        groupInfo += `📌 *Nombre:* ${chat.title}\n`;
        groupInfo += `🆔 *ID:* ${chat.id}\n`;
        groupInfo += `👥 *Tipo:* ${chat.type}\n`;

        if (chat.description) {
            groupInfo += `📝 *Descripción:* ${chat.description}\n`;
        }

        if (chat.invite_link) {
            groupInfo += `🔗 *Enlace:* ${chat.invite_link}\n`;
        } else {
            groupInfo += `🔗 *Enlace:* No disponible (solo el creador puede generar enlaces)\n`;
        }

        // Get member count
        const memberCount = await bot.getChatMemberCount(m.chat);
        groupInfo += `👥 *Miembros:* ${memberCount}\n`;

        await bot.sendMessage(m.chat, groupInfo, { reply_to_message_id: m.id });

    } catch (error) {
        console.error('Error getting group info:', error);
        await bot.sendMessage(m.chat, '❌ *No se pudo obtener la información del grupo.*', { reply_to_message_id: m.id });
    }
}

handler.help = ['link'];
handler.tags = ['grupo'];
handler.command = ['link', 'linkgroup'];

handler.group = true;
handler.botAdmin = true;

export default handler;