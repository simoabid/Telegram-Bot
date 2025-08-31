/*
- Código Creado Por Izumi-kzx
- Código Auténtico Por Code Titans
- Power By Team Code Titans
- Adaptado para Telegram
*/
// *[ 🧇 BING IMAGE SEARCH ]*
import fetch from 'node-fetch'

let handler = async (m, { bot, text }) => {
    if (!text) {
        return bot.sendMessage(m.chat, 'Ingresa el texto de lo que quieres buscar en imágenes 🔍')
    }

    try {
        let api = await fetch(`https://delirius-apiofc.vercel.app/search/bingimage?query=${encodeURIComponent(text)}`)
        let json = await api.json()

        if (!json.results || json.results.length === 0) {
            return bot.sendMessage(m.chat, 'No se encontraron imágenes para tu búsqueda.')
        }

        // Send first few images for Telegram
        const results = json.results.slice(0, 5)

        await bot.sendMessage(m.chat, `🔎 *Resultados de búsqueda:* ${text}\n📸 Encontradas ${results.length} imágenes`, {
            parse_mode: 'Markdown'
        })

        for (let i = 0; i < results.length; i++) {
            const item = results[i]
            try {
                await bot.sendPhoto(m.chat, item.direct, {
                    caption: `📷 *Imagen ${i + 1}*\n*Título:* ${item.title || 'Sin título'}\n*Fuente:* ${item.source || 'No disponible'}`,
                    parse_mode: 'Markdown'
                })

                // Add delay between images to avoid rate limiting
                if (i < results.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 1000))
                }
            } catch (imageError) {
                console.error('Error sending image:', imageError)
                await bot.sendMessage(m.chat, `❌ Error al enviar imagen ${i + 1}: ${item.title || 'Sin título'}`)
            }
        }

    } catch (error) {
        console.error('Error in bingsearch:', error)
        await bot.sendMessage(m.chat, 'Ocurrió un error al buscar las imágenes. Inténtalo de nuevo.')
    }
}
handler.command = /^(bingsearch)$/i
export default handler