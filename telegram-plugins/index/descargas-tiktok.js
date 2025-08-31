import fetch from 'node-fetch';

const handler = async (m, { bot, text, command }) => {
    if (!text) {
        return bot.reply(m.chat, '❌ ¡Necesito un enlace de TikTok! Por favor, proporciona uno después del comando.', m);
    }

    if (!text.match(/(tiktok\.com\/|vt\.tiktok\.com\/)/i)) {
        return bot.reply(m.chat, '🤔 Parece que el enlace no es de TikTok. Por favor, asegúrate de enviar un enlace válido.', m);
    }

    try {
        const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(text)}`;
        const response = await fetch(apiUrl);
        const result = await response.json();

        if (!result || result.code !== 0 || !result.data || (!result.data.play && !result.data.wmplay)) {
            let errorMessage = '❌ No pude descargar el video. Asegúrate de que el enlace sea correcto, público y esté disponible.';
            if (result && result.msg) {
                errorMessage += `\nDetalles: ${result.msg}`;
            }
            return bot.reply(m.chat, errorMessage, m);
        }

        const videoUrl = result.data.play;
        const videoUrlNoWm = result.data.wmplay;

        const finalVideoUrl = videoUrlNoWm || videoUrl;

        if (!finalVideoUrl) {
            return bot.reply(m.chat, '❌ No se encontró una URL de video descargable en la respuesta de TikTok.', m);
        }

        const author = result.data.author?.nickname || 'Desconocido';
        const description = result.data.title || 'Sin descripción';
        const duration = result.data.duration ? formatDuration(result.data.duration) : 'N/A';
        const size = result.data.size ? `${(result.data.size / (1024 * 1024)).toFixed(2)} MB` : 'N/A';

        const caption = `
✅ *TikTok descargado:*

👤 *Autor:* ${author}
📝 *Descripción:* ${description}
⏳ *Duración:* ${duration}
📏 *Tamaño:* ${size}
`;

        await bot.sendMessage(m.chat, {
            video: { url: finalVideoUrl },
            caption: caption,
        }, { quoted: m });

    } catch (error) {
        console.error('Error al descargar TikTok:', error);
        bot.reply(m.chat, '❌ ¡Oops! Algo salió mal al intentar descargar el video. Intenta de nuevo más tarde.', m);
    }
};

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

handler.command = /^(tiktok|tt)$/i;

export default handler;