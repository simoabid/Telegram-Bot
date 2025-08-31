
import fetch from "node-fetch";

const handler = async (m, { bot, text }) => {
    if (!text) return bot.sendMessage(m.chat, "🔍 *Por favor, ingresa tu mensaje para la IA.*", { reply_to_message_id: m.id });

    try {
        // Send processing message instead of reaction
        await bot.sendMessage(m.chat, "💬 Procesando tu consulta con la IA...", { reply_to_message_id: m.id });

        let respuesta = await (await fetch(`https://api.sylphy.xyz/ai/chatgpt?text=${encodeURIComponent(text)}`)).json();

        if (!respuesta || !respuesta.data) return bot.sendMessage(m.chat, "⚠️ *No se obtuvo respuesta, intenta nuevamente.*", { reply_to_message_id: m.id });

        await bot.sendMessage(m.chat, `🤖 *Respuesta AI:* \n${respuesta.data}`, { reply_to_message_id: m.id });
    } catch (e) {
        bot.sendMessage(m.chat, "❌ *Ocurrió un error al procesar la respuesta. Inténtalo más tarde.*", { reply_to_message_id: m.id });
    }
};

handler.help = ["chatbot"];
handler.tags = ["ai"];
handler.command = ["chatbot", "askai"];

export default handler;