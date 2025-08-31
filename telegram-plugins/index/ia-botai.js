
import fetch from 'node-fetch';

const handler = async (m, { bot, args }) => {
  if (!args[0]) {
    return m.reply('🚩 Ingresa un mensaje para que el bot responda.\n📌 Ejemplo: `.botai Hola, ¿cómo estás?`');
  }

  const text = args.join(' ');
  const apiUrl = `https://api.nekorinn.my.id/ai/chatbot?ai_name=Barboza&text=${encodeURIComponent(text)}`;

  try {
    bot.sendMessage(m.chat, '🤖 Generando respuesta...', { reply_to_message_id: m.id });

    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`Error en la API: ${response.statusText}`);

    const json = await response.json();
    if (json && json.data) {
      await bot.sendMessage(m.chat, `🤖 *sᥲsᥙkᥱ ᑲ᥆𝗍 mძ 🌀 dice:* ${json.data}`, { reply_to_message_id: m.id });
    } else {
      await bot.sendMessage(m.chat, "❌ No se obtuvo respuesta de la IA.", { reply_to_message_id: m.id });
    }
  } catch (error) {
    console.error('❌ Error en la solicitud:', error);
    bot.sendMessage(m.chat, '🚩 Ocurrió un error, intenta nuevamente más tarde.', { reply_to_message_id: m.id });
  }
};

handler.command = ['botai'];
export default handler;