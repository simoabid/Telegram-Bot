let handler = async (m, { usedPrefix, command, text, bot }) => {
    try {
        // Check if user is mentioned or replied to
        let targetUser = null
        let mentionedName = 'Usuario'

        if (m.reply_to_message) {
            targetUser = m.reply_to_message.from
            mentionedName = targetUser.first_name || targetUser.username || 'Usuario'
        } else if (text && text.includes('@')) {
            const username = text.replace('@', '').trim()
            mentionedName = username
        } else {
            return bot.sendMessage(m.chat, `⚠️ Menciona a alguien para asustarlo.\nEjemplo: ${usedPrefix + command} @usuario`)
        }

        const progreso = [
            "*🕒 Iniciando acceso a la cuenta...*",
            "■□□□□□ 20% [Conectando a servidor...]",
            "■■□□□□ 30% [Accediendo a base de datos...]",
            "■■■□□□ 50% [Recuperando credenciales...]",
            "■■■■□□ 60% [Desencriptando mensajes...]",
            "■■■■■□ 80% [Extrayendo archivos...]",
            "■■■■■■ 100% [Listo para ejecución]",
            "⚠️ *ERROR 502* ⚠️\n`Fallo en la conexión con el servidor`",
            "☠️ *¡Vulnerabilidad encontrada en el sistema!* ☠️",
            "📡 *Interceptando mensajes en tiempo real...*",
            "🛑 *Sistema comprometido. Contactando administrador...*",
            "🚨 *Acceso root obtenido. Eliminando archivos...*",
            "💀 *Redireccionando tráfico de Telegram...*",
            "🛠 *Instalando malware en dispositivo...*",
            "✅ *Proceso finalizado.*",
        ];

        // Send initial message
        const sentMessage = await bot.sendMessage(m.chat, progreso[0], {
            parse_mode: 'Markdown'
        })

        // Update message with progress
        for (let i = 1; i < progreso.length; i++) {
            await delay(1500);
            try {
                await bot.editMessageText(progreso[i], {
                    chat_id: m.chat,
                    message_id: sentMessage.message_id,
                    parse_mode: 'Markdown'
                })
            } catch (error) {
                // If edit fails, send new message
                await bot.sendMessage(m.chat, progreso[i], {
                    parse_mode: 'Markdown'
                })
            }
        }

        // Final message
        await delay(2000);
        const finalMessage = `⚠️ *ATENCIÓN* ⚠️\n\n@${mentionedName} tu cuenta de Telegram ha sido hackeada. Todos tus datos han sido enviados a un servidor remoto. No hay vuelta atrás...`

        try {
            await bot.editMessageText(finalMessage, {
                chat_id: m.chat,
                message_id: sentMessage.message_id,
                parse_mode: 'Markdown'
            })
        } catch (error) {
            await bot.sendMessage(m.chat, finalMessage, {
                parse_mode: 'Markdown'
            })
        }
    } catch (error) {
        console.error('Error in asustar command:', error)
        await bot.sendMessage(m.chat, '❌ Error al ejecutar el comando')
    }
};

handler.help = ['asustar @usuario'];
handler.tags = ['diversion'];
handler.command = ['asustar', 'hackear'];

export default handler;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));