import axios from "axios";

// Telegram version - simplified album sending
async function sendTelegramAlbum(bot, chatId, medias, caption) {
    try {
        // Send initial message
        await bot.sendMessage(chatId, `🌙 ${caption}\n📸 Enviando ${medias.length} imágenes...`, {
            parse_mode: 'Markdown'
        });

        // Send images one by one with delay
        for (let i = 0; i < medias.length; i++) {
            const media = medias[i];
            try {
                await bot.sendPhoto(chatId, media.data.url, {
                    caption: `📷 *Imagen ${i + 1}/${medias.length}*\n✧➢ *Fuente:* Pinterest`,
                    parse_mode: 'Markdown'
                });

                // Add delay between images
                if (i < medias.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            } catch (imageError) {
                console.error(`Error sending image ${i + 1}:`, imageError);
                await bot.sendMessage(chatId, `❌ Error al enviar imagen ${i + 1}`);
            }
        }
    } catch (error) {
        console.error('Error in sendTelegramAlbum:', error);
        throw error;
    }
}

let handler = async (m, { bot, args }) => {
    try {
        if (!args.length) {
            return bot.sendMessage(m.chat, "Por favor, proporciona una consulta.\n\nEjemplo: .pinterest gato");
        }

        // Send loading message
        await bot.sendMessage(m.chat, "⏱️ Buscando imágenes en Pinterest...");

        const query = args.join(" ");
        const apiUrl = `https://api.dorratz.com/v2/pinterest?q=${encodeURIComponent(query)}`;
        const response = await axios.get(apiUrl);

        if (!Array.isArray(response.data) || response.data.length === 0) {
            return await bot.sendMessage(m.chat, "No se encontraron resultados.");
        }

        const limitedData = response.data.slice(0, 10);
        const medias = limitedData.map(item => ({
            type: "image",
            data: { url: item.image_large_url },
            caption: `✧➢ *Fuente:* Pinterest`
        }));

        const albumCaption = "Imágenes encontradas en Pinterest";
        await sendTelegramAlbum(bot, m.chat, medias, albumCaption);

    } catch (error) {
        console.error("Error durante la búsqueda en Pinterest:", error);
        await bot.sendMessage(m.chat, "❌ Error al buscar imágenes en Pinterest. Inténtalo de nuevo.");
    }
};

handler.help = ["pinterest"];
handler.tags = ["search"];
handler.command = ["pinterest", "pin"];

export default handler;