import fetch from 'node-fetch';

const handler = async (m, { bot, args, usedPrefix, command }) => {
    try {
        if (!args.length) {
            return await bot.sendMessage(m.chat, `❌ Debes proporcionar una pregunta.\n\nEjemplo: *${usedPrefix + command} ¿Cuál es el origen del universo?*`, { reply_to_message_id: m.id });
        }

        const query = encodeURIComponent(args.join(" "));
        const apiUrl = `https://api.siputzx.my.id/api/ai/blackboxai-pro?content=${query}`;

        await bot.sendMessage(m.chat, '🤖 Consultando Blackbox AI...', { reply_to_message_id: m.id });

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000); // 10 segundos

        const response = await fetch(apiUrl, { signal: controller.signal });
        clearTimeout(timeout);

        if (!response.ok) throw new Error('❌ Error al contactar la API.');

        const result = await response.json();

        if (!result.status || !result.data) {
            throw new Error('❌ La API no devolvió una respuesta válida.');
        }

        const cleanText = result.data.replace(/<[^>]*>/g, '').trim();

        await bot.sendMessage(m.chat, `🧠 *Blackbox AI responde:*\n\n${cleanText}`, { reply_to_message_id: m.id });

        await bot.sendMessage(m.chat, '✅ Consulta completada exitosamente');

    } catch (err) {
        console.error(err);
        await bot.sendMessage(m.chat, `❌ Ocurrió un error al procesar tu pregunta.\n\n${err.name === 'AbortError' ? '⏱️ Tiempo de espera agotado.' : err.message}`, { reply_to_message_id: m.id });
    }
};

handler.command = /^blackboxai$/i;
export default handler;