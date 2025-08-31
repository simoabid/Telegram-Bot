let handler = async (m, { bot }) => {
    try {
        // Check if it's a group chat
        const chatInfo = await bot.getChat(m.chat)
        if (chatInfo.type !== 'group' && chatInfo.type !== 'supergroup') {
            return bot.sendMessage(m.chat, '⚠️ Este comando solo se puede usar en grupos.')
        }

        // Get chat administrators
        const admins = await bot.getChatAdministrators(m.chat)
        const adminIds = admins.map(admin => admin.user.id)

        // Bot creator number
        const botCreatorId = 584246582666 // Adjust as needed

        // Check if user is admin or creator
        const isAdminOrCreator = (userId) => {
            return adminIds.includes(userId) || userId === botCreatorId
        }

        // For Telegram, we can't easily get all members, so we'll use a simplified approach
        // This would need to be enhanced with actual member data
        const message = `🎲 *RULETA DE LA MUERTE* ☠️\n\n*¡La ruleta ha elegido a alguien!*\n\n_Nota: En Telegram, este comando está limitado por las restricciones de la API._`

        await bot.sendMessage(m.chat, message, {
            parse_mode: 'Markdown'
        })

        // Note: Actual member removal would require proper permissions and member data
        // This is a simplified version for demonstration

    } catch (error) {
        console.error('Error in ruletadelban command:', error)
        await bot.sendMessage(m.chat, '❌ Error al ejecutar el comando')
    }
};

handler.command = /^(ruletadelban)$/i;
handler.group = true;
handler.tags = ['game'];
handler.admin = true;
handler.botAdmin = true;

export default handler;

const delay = time => new Promise(res => setTimeout(res, time));