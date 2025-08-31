import fetch from 'node-fetch'

let handler = async (m, { bot, text }) => {
    if (!text) return bot.reply(m.chat, 'Ingresa el texto de lo que quieres buscar en imágenes 🔍', m);

    await bot.sendMessage(m.chat, '🔍 Buscando imágenes...');

    try {
        let api = await fetch(`https://api.diioffc.web.id/api/search/gimage?query=${encodeURIComponent(text)}`);
        let json = await api.json();

        if (!json.result || json.result.length === 0) {
            return bot.reply(m.chat, 'No se encontraron imágenes para tu búsqueda.', m);
        }

        // Send first few images (limit to 5 to avoid spam)
        const results = json.result.slice(0, 5);

        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            const caption = `🖼️ *Imagen ${i + 1}*\n\n` +
                          `📝 *Título:* ${result.title || 'Sin título'}\n` +
                          `📄 *Descripción:* ${result.snippet || 'Sin descripción'}\n` +
                          `🔗 *Fuente:* ${result.image?.contextLink || 'No disponible'}`;

            try {
                await bot.sendPhoto(m.chat, result.link, {
                    caption: caption,
                    reply_to_message_id: m.id
                });
            } catch (e) {
                console.log(`Error sending image ${i + 1}:`, e);
                // Continue with next image if one fails
            }
        }

        await bot.sendMessage(m.chat, `✅ Se enviaron ${results.length} imágenes de "${text}"`);

    } catch (error) {
        console.error('Error en búsqueda de imágenes:', error);
        bot.reply(m.chat, '❌ Error al buscar imágenes. Intenta de nuevo más tarde.', m);
    }
}

handler.help = ['imagen *<texto>*']
handler.tags = ['internet', 'dl']
handler.command = /^(image|imagen)$/i

export default handler;