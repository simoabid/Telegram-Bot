import fetch from 'node-fetch'

let handler = async (m, { bot, text }) => {
    try {
        if (!text) {
            return bot.sendMessage(m.chat, 'Ingresa el texto de lo que quieres buscar en imágenes 🔍');
        }

        // Send loading message
        await bot.sendMessage(m.chat, '🕓 Buscando imágenes...');

        let api = await fetch(`https://api.diioffc.web.id/api/search/gimage?query=${encodeURIComponent(text)}`);
        let json = await api.json();

        if (!json.result || json.result.length === 0) {
            return bot.sendMessage(m.chat, 'No se encontraron imágenes para tu búsqueda.');
        }

        // Send initial message
        await bot.sendMessage(m.chat, `🔎 *Resultados de búsqueda:* ${text}\n📸 Encontradas ${json.result.length} imágenes`, {
            parse_mode: 'Markdown'
        });

        // Send first few images
        const results = json.result.slice(0, 5);

        for (let i = 0; i < results.length; i++) {
            const result = results[i];
            try {
                await bot.sendPhoto(m.chat, result.link, {
                    caption: `📷 *Imagen ${i + 1}/${results.length}*\n*Título:* ${result.title || 'Sin título'}\n*Descripción:* ${result.snippet || 'Sin descripción'}`,
                    parse_mode: 'Markdown'
                });

                // Add delay between images
                if (i < results.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            } catch (imageError) {
                console.error(`Error sending image ${i + 1}:`, imageError);
                await bot.sendMessage(m.chat, `❌ Error al enviar imagen ${i + 1}: ${result.title || 'Sin título'}`);
            }
        }

        await bot.sendMessage(m.chat, '✅ Búsqueda completada');

    } catch (error) {
        console.error('Error in imagen search:', error);
        await bot.sendMessage(m.chat, '❌ Error al buscar imágenes. Inténtalo de nuevo.');
    }
}

handler.help = ['imagen *<texto>*']
handler.tags = ['internet', 'dl']
handler.command = /^(image|imagen)$/i

export default handler;


/* import { googleImage } from '@bochilteam/scraper'

let handler = async (m, { bot, text, usedPrefix, command }) => {
    let user = global.db.data.users[m.sender]

    if (!text) throw `𝗤𝘂𝗲 𝗯𝘂𝘀𝗰𝗮𝗿? 🤔️\n𝗨𝘀𝗲𝗹𝗼 𝗱𝗲 𝗹𝗮 𝘀𝗶𝗴𝘂𝗶𝗲𝗻𝘁𝗲 𝗺𝗮𝗻𝗲𝗿𝗮\n𝗘𝗷𝗲𝗺𝗽𝗹𝗼:\n*${usedPrefix + command} Loli*`

    const res = await googleImage(text)
    let image = res.getRandom()
    let link = image

    await delay(1000)

    await bot.sendMessage(m.chat, { 
        image: { url: link }, 
        caption: `*🔎 Resultado De: ${text}*`, 
        footer: dev, 
        buttons: [
            {
                buttonId: `${usedPrefix + command} ${text}`,
                buttonText: { displayText: 'Siguiente' }
            }
        ],
        viewOnce: true,
        headerType: 4
    }, { quoted: m })
}

handler.help = ['imagen *<texto>*']
handler.tags = ['internet', 'dl']
handler.command = /^(image|imagen)$/i

export default handler */