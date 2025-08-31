let handler = async (m, { bot, usedPrefix, text }) => {
    try {
        const initialMessage = await bot.sendMessage(m.chat, "Tas caliente! Ahora te hare una paja");

        const array = [
            "8==👊==D", "8===👊=D", "8=👊===D", "8=👊===D", "8==👊==D", "8===👊=D", "8====👊D",
            "8==👊=D", "8==👊==D", "8=👊===D", "8👊====D", "8=👊===D","8==👊==D", "8===👊=D",
            "8====👊D","8==👊==D", "8===👊=D", "8=👊===D", "8=👊===D", "8==👊==D", "8===👊=D", "8====👊D💦"
        ];

        for (let item of array) {
            try {
                await bot.editMessageText(item, {
                    chat_id: m.chat,
                    message_id: initialMessage.message_id
                });
                await new Promise(resolve => setTimeout(resolve, 200)); // Delay 200ms
            } catch (error) {
                // If edit fails, send new message
                await bot.sendMessage(m.chat, item);
                await new Promise(resolve => setTimeout(resolve, 200));
            }
        }

        // Final message
        try {
            await bot.editMessageText("Oh, se corrió en menos de 1 hora!", {
                chat_id: m.chat,
                message_id: initialMessage.message_id
            });
        } catch (error) {
            await bot.sendMessage(m.chat, "Oh, se corrió en menos de 1 hora!");
        }
    } catch (error) {
        console.error('Error in paja command:', error);
        await bot.sendMessage(m.chat, '❌ Error al ejecutar el comando');
    }
};

handler.help = ['pajeame'];
handler.tags = ['fun'];
handler.command = /^pajeame|paja$/i;

export default handler;