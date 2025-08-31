let handler = async (m, { bot, usedPrefix, command, args, users, setting }) => {
    try {
        if (!args || !args[0]) {
            return bot.reply(m.chat, `🪐 Ingresé El Link De Mediafire.\n*Ejemplo:* ${usedPrefix}${command} https://www.mediafire.com/file/c2fyjyrfckwgkum/ZETSv1%25282%2529.zip/file`, m);
        }

        if (!args[0].match(/(https:\/\/www.mediafire.com\/)/gi)) {
            return bot.reply(m.chat, `Enlace inválido.`, m);
        }

        m.react('🕒');

        console.log(`🔍 MediaFire download request for: ${args[0]}`);

        // Try multiple APIs for better reliability
        const apis = [
            {
                name: 'sylphy.xyz',
                url: `https://api.sylphy.xyz/download/mediafire?url=${encodeURIComponent(args[0])}&apikey=tesis-te-amo`,
                extract: (data) => {
                    if (data.data && data.data.download) {
                        return {
                            filename: data.data.filename,
                            size: data.data.size,
                            mimetype: data.data.mimetype,
                            download: data.data.download
                        };
                    }
                    return null;
                }
            },
            {
                name: 'delirius-api',
                url: `https://delirius-apiofc.vercel.app/download/mediafire?url=${encodeURIComponent(args[0])}`,
                extract: (data) => {
                    if (data.data && data.data.link) {
                        return {
                            filename: data.data.filename,
                            size: data.data.size,
                            mimetype: data.data.mime || 'application/octet-stream',
                            download: data.data.link
                        };
                    }
                    return null;
                }
            },
            {
                name: 'siputzx-api',
                url: `https://api.siputzx.my.id/api/d/mediafire?url=${encodeURIComponent(args[0])}`,
                extract: (data) => {
                    if (data.data && data.data.downloadLink) {
                        return {
                            filename: data.data.fileName,
                            size: data.data.fileSize,
                            mimetype: data.data.mimeType || 'application/octet-stream',
                            download: data.data.downloadLink
                        };
                    }
                    return null;
                }
            }
        ];

        let json = null;
        let lastError = null;

        for (const api of apis) {
            try {
                console.log(`🔄 Trying API: ${api.name}`);
                const response = await fetch(api.url);

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const apiResponse = await response.json();
                console.log(`📋 ${api.name} Response:`, JSON.stringify(apiResponse, null, 2));

                // Check if this API returned valid data
                const extractedData = api.extract(apiResponse);
                if (extractedData && extractedData.download) {
                    json = { status: true, data: extractedData };
                    console.log(`✅ Success with API: ${api.name}`);
                    console.log(`📋 Extracted data:`, extractedData);
                    break;
                }

                lastError = new Error(`${api.name}: No valid download data found`);

            } catch (error) {
                console.error(`❌ ${api.name} failed:`, error.message);
                lastError = error;
            }
        }

        if (!json) {
            throw new Error('❌ No se pudo descargar el archivo de MediaFire. Posibles causas:\n• El enlace no es válido o el archivo fue eliminado\n• Los servidores de MediaFire están temporalmente no disponibles\n• Intenta de nuevo más tarde');
        }

        // Check if API request was successful
        if (!json.status || json.status === false) {
            const errorMessage = json.message || 'API returned error status';
            throw new Error(`MediaFire API Error: ${errorMessage}`);
        }

        // Validate response structure
        if (!json.data || typeof json.data !== 'object') {
            throw new Error('Invalid API response: missing data object');
        }

        // Check for required properties
        if (!json.data.download) {
            throw new Error('No download link found in API response');
        }

        if (!json.data.filename) {
            throw new Error('No filename found in API response');
        }

        // Prepare file information
        const fileInfo = {
            name: json.data.filename || 'Unknown',
            size: json.data.size || 'Unknown',
            mimetype: json.data.mimetype || 'Unknown',
            download: json.data.download
        };

        let info = `
✦ \`Nombre :\` ${fileInfo.name}
✧ \`Peso :\` ${fileInfo.size}
✦ \`Link :\` ${args[0]}
✧ \`Mime :\` ${fileInfo.mimetype}
`;

        await m.reply(info);
        console.log(`📥 Sending MediaFire file: ${fileInfo.name}`);
        console.log(`🔗 Download URL: ${fileInfo.download}`);

        await bot.sendDocument(m.chat, fileInfo.download, {
            caption: `📁 *${fileInfo.name}*\n📦 Tamaño: ${fileInfo.size}`,
            reply_to_message_id: m.message_id,
            filename: fileInfo.name
        });

        console.log(`✅ MediaFire file sent successfully: ${fileInfo.name}`);
    } catch (e) {
        return bot.reply(m.chat, `Error: ${e.message}`, m);
    }
};

handler.command = handler.help = ['mediafire', 'mf', 'mfdl'];
handler.tags = ["descargas"];;
export default handler;