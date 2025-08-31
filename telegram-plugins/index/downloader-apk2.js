let handler = async (m, { bot, args, usedPrefix, command, isOwner }) => {
    if (!args[0]) {
        return bot.sendMessage(m.chat, `\`\`\`[ 🐉 ] Ingresa el nombre de la aplicación que quieres descargar. Ejemplo:\n${usedPrefix + command} Clash Royale\`\`\``, {
            reply_to_message_id: m.message_id
        });
    }

    try {
        await bot.sendMessage(m.chat, '🔍 *Buscando aplicación...*', {
            reply_to_message_id: m.message_id
        });

        const searchQuery = args.join(' ');
        console.log(`🔍 APK search for: ${searchQuery}`);

        let res = await fetch(`https://api.dorratz.com/v2/apk-dl?text=${encodeURIComponent(searchQuery)}`);

        if (!res.ok) {
            throw new Error(`API Error: ${res.status} ${res.statusText}`);
        }

        let result = await res.json();
        console.log('📋 API Response:', JSON.stringify(result, null, 2));

        if (!result || !result.name || !result.dllink) {
            throw new Error('No se encontró la aplicación solicitada o la API no devolvió datos válidos');
        }

        let { name, size, lastUpdate, icon } = result;
        let URL = result.dllink;
        let packe = result.package;

        // Validate download URL
        if (!URL || !URL.startsWith('http')) {
            throw new Error('URL de descarga inválida recibida de la API');
        }

        console.log(`📱 Found app: ${name}`);
        console.log(`📦 Size: ${size || 'Unknown'}`);
        console.log(`🔗 Download URL: ${URL}`);

        let texto = ` \`\`\`
descargando aplicación...espere
   - ${global.wm || 'Bot'} -
\`\`\`
`;

        // Send icon image first (if available)
        if (icon) {
            try {
                await bot.sendPhoto(m.chat, icon, {
                    caption: texto,
                    reply_to_message_id: m.message_id
                });
            } catch (iconError) {
                console.warn('⚠️ Could not send icon:', iconError.message);
                // Send text message instead
                await bot.sendMessage(m.chat, texto, {
                    reply_to_message_id: m.message_id
                });
            }
        } else {
            await bot.sendMessage(m.chat, texto, {
                reply_to_message_id: m.message_id
            });
        }

        // Download and send APK file
        console.log(`📥 Downloading APK from: ${URL}`);

        // Check file size first
        const headResponse = await fetch(URL, { method: 'HEAD' });
        const fileSize = headResponse.headers.get('content-length');
        const fileSizeMB = fileSize ? (parseInt(fileSize) / (1024 * 1024)).toFixed(2) : 'Unknown';

        if (fileSize && parseInt(fileSize) > 50 * 1024 * 1024) { // 50MB limit
            // For large files, send download link instead
            await bot.sendMessage(m.chat,
                `📱 *${name}*\n` +
                `📦 Tamaño: ${size || fileSizeMB + ' MB'}\n` +
                `📅 Última actualización: ${lastUpdate}\n` +
                `📋 Paquete: ${packe}\n\n` +
                `⚠️ *El archivo es demasiado grande para enviarlo por Telegram (${fileSizeMB} MB)*\n\n` +
                `🔗 *Enlace de descarga directa:*\n${URL}\n\n` +
                `💡 *Instrucciones:*\n` +
                `1. Toca el enlace para descargar\n` +
                `2. Instala el APK en tu dispositivo\n` +
                `3. Asegúrate de permitir instalaciones de fuentes desconocidas`,
                {
                    reply_to_message_id: m.message_id,
                    disable_web_page_preview: false
                }
            );
            console.log(`📋 Large file link sent for: ${name} (${fileSizeMB} MB)`);
            return;
        }

        // Download the APK file
        const apkResponse = await fetch(URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        if (!apkResponse.ok) {
            throw new Error(`No se pudo descargar el APK: ${apkResponse.status} ${apkResponse.statusText}`);
        }

        const apkBuffer = await apkResponse.arrayBuffer();
        console.log(`📥 APK downloaded successfully, size: ${apkBuffer.byteLength} bytes`);

        // Send APK file as buffer with proper filename and MIME type
        const cleanName = name.replace(/[^\w\s-]/g, '').trim().substring(0, 50); // Clean and limit filename
        const apkFileName = cleanName ? `${cleanName}.apk` : `app_${Date.now()}.apk`;

        // Use the correct format for node-telegram-bot-api
        await bot.sendDocument(m.chat, Buffer.from(apkBuffer), {
            caption: `📱 *${name}*\n📦 Tamaño: ${size}\n📅 Última actualización: ${lastUpdate}\n📋 Paquete: ${packe}`,
            reply_to_message_id: m.message_id
        }, {
            filename: apkFileName,
            contentType: 'application/vnd.android.package-archive'
        });

        console.log(`✅ APK sent successfully: ${name}`);

    } catch (error) {
        console.error('🚨 APK Download Error:', error);
        await bot.sendMessage(m.chat, `❌ *Error:* ${error.message || 'No se pudo descargar la aplicación'}`, {
            reply_to_message_id: m.message_id
        });
    }
};
handler.command = ['apk2','dapk2']
handler.group = false;
handler.help = ['apk2']
handler.tags = ['descargas']
export default handler