import fetch from "node-fetch";

const handler = async (m, { isOwner, isAdmin, bot, text, args}) => {
    try {
        // Check if it's a group
        const chatInfo = await bot.getChat(m.chat)
        if (chatInfo.type !== 'group' && chatInfo.type !== 'supergroup') {
            return bot.sendMessage(m.chat, '⚠️ Este comando solo funciona en grupos.')
        }

        // Check admin permissions (simplified for Telegram)
        const admins = await bot.getChatAdministrators(m.chat)
        const isUserAdmin = admins.some(admin => admin.user.id === m.from_user?.id)

        if (!isUserAdmin && !isOwner) {
            return bot.sendMessage(m.chat, '❌ No tienes permisos para usar este comando.')
        }

        // Initialize chat data
        if (!global.db.data.chats[m.chat]) {
            global.db.data.chats[m.chat] = { emojiTag: '🤖' }
        }

        const chat = global.db.data.chats[m.chat];
        const emoji = chat.emojiTag || '🤖';
        const customMessage = args.join(' ') || '';
        const groupName = chatInfo.title;
        const memberCount = await bot.getChatMembersCount(m.chat)

        const countryFlags = {
            '1': '🇺🇸', '44': '🇬🇧', '33': '🇫🇷', '49': '🇩🇪', '39': '🇮🇹', '81': '🇯🇵',
            '82': '🇰🇷', '86': '🇨🇳', '7': '🇷🇺', '91': '🇮🇳', '61': '🇦🇺', '64': '🇳🇿',
            '34': '🇪🇸', '55': '🇧🇷', '52': '🇲🇽', '54': '🇦🇷', '57': '🇨🇴', '51': '🇵🇪',
            '56': '🇨🇱', '58': '🇻🇪', '502': '🇬🇹', '503': '🇸🇻', '504': '🇭🇳', '505': '🇳🇮',
            '506': '🇨🇷', '507': '🇵🇦', '591': '🇧🇴', '592': '🇬🇾', '593': '🇪🇨', '595': '🇵🇾',
            '596': '🇲🇶', '597': '🇸🇷', '598': '🇺🇾', '53': '🇨🇺', '20': '🇪🇬', '972': '🇮🇱',
            '90': '🇹🇷', '63': '🇵🇭', '62': '🇮🇩', '60': '🇲🇾', '65': '🇸🇬', '66': '🇹🇭',
            '31': '🇳🇱', '32': '🇧🇪', '30': '🇬🇷', '36': '🇭🇺', '46': '🇸🇪', '47': '🇳🇴',
            '48': '🇵🇱', '421': '🇸🇰', '420': '🇨🇿', '40': '🇷🇴', '43': '🇦🇹', '373': '🇲🇩'
        };

        let messageText = `*${groupName}*\n\n*Integrantes: ${memberCount}*\n${customMessage}\n┌──⭓ *Despierten*\n`;

        // For Telegram, we can't easily get all members, so we'll create a simplified version
        messageText += `${emoji} 🏳️‍🌈 Todos los miembros del grupo\n`;
        messageText += `└───────⭓\n\n𝘚𝘶𝘱𝘦𝘳 𝘉𝘰𝘵 𝘛𝘦𝘭𝘦𝘨𝘳𝘢𝘮 🚩`;

        const imageUrl = 'https://cdn-sunflareteam.vercel.app/images/fa68a035ca.jpg';

        // Send photo with caption
        try {
            await bot.sendPhoto(m.chat, imageUrl, {
                caption: messageText,
                parse_mode: 'Markdown'
            });
        } catch (error) {
            // Fallback to text message if image fails
            await bot.sendMessage(m.chat, messageText, {
                parse_mode: 'Markdown'
            });
        }

        // Send audio message
        try {
            const audioUrl = 'https://cdn.russellxz.click/a8f5df5a.mp3';
            await bot.sendAudio(m.chat, audioUrl);
        } catch (error) {
            console.log('Audio send failed:', error);
        }

    } catch (error) {
        console.error('Error in tagall command:', error)
        await bot.sendMessage(m.chat, '❌ Error al ejecutar el comando')
    }
};

handler.help = ['todos'];
handler.tags = ['group'];
handler.command = /^(tagall|invocar|marcar|todos|invocación)$/i;
handler.admin = false;
handler.group = true;

export default handler;