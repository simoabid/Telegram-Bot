
let handler = async (m, { bot }) => {
    try {
        // Get chat info for Telegram
        const chatInfo = await bot.getChat(m.chat)

        // Check if it's a group
        if (chatInfo.type !== 'group' && chatInfo.type !== 'supergroup') {
            return bot.sendMessage(m.chat, '⚠️ Este comando solo funciona en grupos.')
        }

        // Initialize chat data if not exists
        if (!global.db.data.chats[m.chat]) {
            global.db.data.chats[m.chat] = {
                isBanned: false,
                welcome: false,
                detect: false,
                sWelcome: '',
                sBye: '',
                sPromote: '',
                sDemote: '',
                antiLink: false,
                delete: false
            }
        }

        const chat = global.db.data.chats[m.chat];
        const { isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink, delete: del} = chat;

        // Get administrators
        const admins = await bot.getChatAdministrators(m.chat)
        const adminList = admins.map((admin, i) => `  ${i + 1}. @${admin.user.username || admin.user.first_name}`).join('\n')

        // Get member count
        const memberCount = await bot.getChatMembersCount(m.chat)

        const text = `
╭━━━〔 *📋 INFORMACIÓN DEL GRUPO* 〕━━━╮
┃👥 *Nombre:* ${chatInfo.title}
┃🆔 *ID:* ${chatInfo.id}
┃👤 *Creador:* ${chatInfo.description ? 'Ver descripción' : 'No disponible'}
┃👪 *Miembros:* ${memberCount}
┃🛠️ *Administradores:*
┃${adminList}
╰━━━━━━━━━━━━━━━━━━━━━━━╯

╭──〔 ⚙️ *CONFIGURACIONES* 〕──╮
┃🚫 *Baneado:* ${isBanned? '✅': '❎'}
┃👋 *Bienvenida:* ${welcome? '✅': '❎'}
┃🕵️ *Detector:* ${detect? '✅': '❎'}
┃🗑️ *Anti Delete:* ${!del? '✅': '❎'}
┃🔗 *Anti Link:* ${antiLink? '✅': '❎'}
╰──────────────────────────╯

╭──〔 📨 *MENSAJES PERSONALIZADOS* 〕──╮
┃👋 *Bienvenida:* ${sWelcome || '-'}
┃👋 *Despedida:* ${sBye || '-'}
┃📈 *Promociones:* ${sPromote || '-'}
┃📉 *Degradaciones:* ${sDemote || '-'}
╰────────────────────────────────────╯

📜 *Descripción:*
${chatInfo.description || 'Sin descripción definida.'}
`.trim();

        await bot.sendMessage(m.chat, text, {
            parse_mode: 'Markdown'
        });

    } catch (e) {
        console.error(e);
        await bot.sendMessage(m.chat, '⚠️ Ocurrió un error al obtener la información del grupo.');
    }
};

handler.help = ['infogp'];
handler.tags = ['group'];
handler.command = ['infogrupo','infogp'];
handler.group = true;

export default handler;