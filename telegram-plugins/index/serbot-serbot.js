// Telegram bot doesn't support sub-bots like WhatsApp
// This is a simplified version for Telegram

let handler = async (m, { bot, usedPrefix, command }) => {
    try {
        const message = `🤖 *Información sobre Sub Bots*

📱 *Nota importante:* Los bots de Telegram funcionan de manera diferente a WhatsApp.

🔹 En Telegram, no es posible crear "sub-bots" como en WhatsApp
🔹 Cada bot de Telegram es independiente y requiere su propio token
🔹 Para crear un nuevo bot de Telegram, debes:

1️⃣ Contactar a @BotFather en Telegram
2️⃣ Usar el comando /newbot
3️⃣ Seguir las instrucciones para obtener un token
4️⃣ Configurar el bot con el token obtenido

💡 *Alternativa:* Puedes agregar este bot a múltiples grupos para expandir su alcance.

🔗 *Más información:* https://core.telegram.org/bots`;

        await bot.sendMessage(m.chat, message, {
            parse_mode: 'Markdown'
        });
    } catch (error) {
        console.error('Error in serbot command:', error);
        await bot.sendMessage(m.chat, '❌ Error al mostrar información del serbot');
    }
};

handler.help = ['serbot', 'subbot'];
handler.tags = ['serbot'];
handler.command = /^(serbot|subbot)$/i;

export default handler;
