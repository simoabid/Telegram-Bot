let mutedUsers = new Set();

let handler = async (m, { bot, usedPrefix, command, isAdmin, isBotAdmin }) => {
    if (!isBotAdmin) return bot.sendMessage(m.chat, '⭐ El bot necesita ser administrador.', { reply_to_message_id: m.id });
    if (!isAdmin) return bot.sendMessage(m.chat, '⭐ Solo los administradores pueden usar este comando.', { reply_to_message_id: m.id });

    let user;
    if (m.quoted) {
        user = m.quoted.sender;
    } else {
        return bot.sendMessage(m.chat, '⭐ Responde al mensaje del usuario que quieres mutear.', { reply_to_message_id: m.id });
    }

    if (command === "mute") {
        try {
            // Use Telegram's restrictChatMember method
            await bot.restrictChatMember(m.chat, user, {
                can_send_messages: false,
                can_send_media_messages: false,
                can_send_polls: false,
                can_send_other_messages: false,
                can_add_web_page_previews: false,
                can_change_info: false,
                can_invite_users: false,
                can_pin_messages: false
            });
            mutedUsers.add(user);
            bot.sendMessage(m.chat, `✅ *Usuario muteado:* ${user}`, { reply_to_message_id: m.id });
        } catch (error) {
            console.error('Error muting user:', error);
            bot.sendMessage(m.chat, '❌ *No se pudo mutear al usuario. Verifica los permisos.*', { reply_to_message_id: m.id });
        }
    } else if (command === "unmute") {
        try {
            // Restore user permissions
            await bot.restrictChatMember(m.chat, user, {
                can_send_messages: true,
                can_send_media_messages: true,
                can_send_polls: true,
                can_send_other_messages: true,
                can_add_web_page_previews: true,
                can_change_info: false,
                can_invite_users: false,
                can_pin_messages: false
            });
            mutedUsers.delete(user);
            bot.sendMessage(m.chat, `✅ *Usuario desmuteado:* ${user}`, { reply_to_message_id: m.id });
        } catch (error) {
            console.error('Error unmuting user:', error);
            bot.sendMessage(m.chat, '❌ *No se pudo desmutear al usuario. Verifica los permisos.*', { reply_to_message_id: m.id });
        }
    }
};

handler.before = async (m, { bot }) => {
    if (mutedUsers.has(m.sender) && m.mtype !== 'stickerMessage') {
        try {
            await bot.sendMessage(m.chat, { delete: m.key });
        } catch (e) {
            console.error(e);
        }
    }
};

handler.help = ['mute', 'unmute'];
handler.tags = ['group'];
handler.command = /^(mute|unmute)$/i;
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;