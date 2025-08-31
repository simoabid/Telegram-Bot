// Telegram version - ViewOnce functionality
// Note: Telegram doesn't have ViewOnce messages like WhatsApp

let handler = async (m, { bot }) => {
    try {
        if (!m.reply_to_message) {
            return bot.sendMessage(m.chat, `📱 Responde a un mensaje con media para procesarlo.`)
        }

        // Check if the replied message has media
        if (m.reply_to_message.photo) {
            // Handle photo
            const fileId = m.reply_to_message.photo[m.reply_to_message.photo.length - 1].file_id
            const file = await bot.getFile(fileId)
            const caption = m.reply_to_message.caption || 'Imagen procesada'

            await bot.sendPhoto(m.chat, fileId, {
                caption: `📸 *Imagen reenviada*\n${caption}`,
                parse_mode: 'Markdown'
            })

        } else if (m.reply_to_message.video) {
            // Handle video
            const fileId = m.reply_to_message.video.file_id
            const caption = m.reply_to_message.caption || 'Video procesado'

            await bot.sendVideo(m.chat, fileId, {
                caption: `🎥 *Video reenviado*\n${caption}`,
                parse_mode: 'Markdown'
            })

        } else if (m.reply_to_message.document) {
            // Handle document
            const fileId = m.reply_to_message.document.file_id
            const fileName = m.reply_to_message.document.file_name || 'documento'

            await bot.sendDocument(m.chat, fileId, {
                caption: `📄 *Documento reenviado*\n${fileName}`,
                parse_mode: 'Markdown'
            })

        } else {
            return bot.sendMessage(m.chat, `❌ El mensaje no contiene media válida (foto, video o documento).`)
        }

    } catch (error) {
        console.error('Error in read command:', error)
        await bot.sendMessage(m.chat, '❌ Error al procesar el media')
    }
}

handler.command = ['readviewonce', 'read', 'readvo', 'rvo', 'ver']
handler.group = true;

export default handler
