import fetch from 'node-fetch';
import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';

var handler = async (m, { bot, args, usedPrefix, command }) => {
    if (!args[0]) {
        throw m.reply(`*🦅 Ejemplo: ${usedPrefix + command}* https://vm.tiktok.com/ZMhAk8tLx/`);
    }

    // Validate TikTok URL
    const tiktokUrl = args[0];
    if (!tiktokUrl.includes('tiktok.com') && !tiktokUrl.includes('vm.tiktok.com')) {
        return bot.sendMessage(m.chat, '❌ *Error:* Por favor proporciona un enlace válido de TikTok', {
            reply_to_message_id: m.message_id
        });
    }

    try {
        await bot.sendMessage(m.chat, "🌷 *Espere un momento, estoy descargando y convirtiendo el audio...*", {
            reply_to_message_id: m.message_id
        });

        console.log(`🎵 TikTok MP3 request for URL: ${args[0]}`);
        const tiktokData = await tiktokdl(args[0]);

        if (!tiktokData || !tiktokData.data || !tiktokData.data.music) {
            throw new Error("❌ *Error:* No se pudo obtener el audio.");
        }

        const audioURL = tiktokData.data.music;
        console.log(`🎵 Audio URL obtained: ${audioURL}`);

        // Use timestamp to avoid file conflicts
        const timestamp = Date.now();
        const filePath = path.join(process.cwd(), `tiktok_audio_${timestamp}.mp3`);
        const convertedPath = path.join(process.cwd(), `tiktok_audio_converted_${timestamp}.mp3`);

        try {
            // Descargar el archivo de audio
            console.log(`🎵 Downloading audio from: ${audioURL}`);
            const response = await fetch(audioURL, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to download audio: ${response.status} ${response.statusText}`);
            }

            const buffer = await response.arrayBuffer();
            fs.writeFileSync(filePath, Buffer.from(buffer));
            console.log(`🎵 Audio downloaded successfully`);

            // Convertir a MP3 si es necesario
            console.log(`🎵 Converting audio to MP3...`);
            await convertAudio(filePath, convertedPath);
            console.log(`🎵 Audio conversion completed`);

            // Enviar el archivo convertido
            console.log(`🎵 Sending audio file...`);
            await bot.sendAudio(
                m.chat,
                fs.readFileSync(convertedPath),
                {
                    caption: "🎵 *Audio de TikTok convertido a MP3*",
                    reply_to_message_id: m.message_id,
                    filename: "tiktok_audio.mp3"
                }
            );

            await bot.sendMessage(m.chat, "✅ *Audio convertido y enviado correctamente.*", {
                reply_to_message_id: m.message_id
            });
            console.log(`🎵 TikTok MP3 process completed successfully`);

        } finally {
            // Borrar archivos temporales
            try {
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                    console.log(`🗑️ Cleaned up: ${filePath}`);
                }
                if (fs.existsSync(convertedPath)) {
                    fs.unlinkSync(convertedPath);
                    console.log(`🗑️ Cleaned up: ${convertedPath}`);
                }
            } catch (cleanupError) {
                console.error('Error cleaning up files:', cleanupError);
            }
        }
    } catch (error) {
        console.error('🚨 TikTok MP3 Error:', error);
        bot.sendMessage(m.chat, `❌ *Error:* ${error.message || "No se pudo procesar la solicitud."}`, {
            reply_to_message_id: m.message_id
        });
    }
};

handler.help = ['ttmp3', 'tiktokmp3'];
handler.tags = ['descargas'];
handler.command = /^ttmp3|tiktokmp3$/i;

handler.disable = false;
handler.register = false;
handler.limit = true;

export default handler;

async function tiktokdl(url) {
    // Multiple API fallbacks for better reliability
    const apis = [
        {
            name: 'tikwm.com',
            url: `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}&hd=1`,
            extract: (data) => data?.data?.music ? { data: { music: data.data.music } } : null
        },
        {
            name: 'siputzx.my.id',
            url: `https://api.siputzx.my.id/api/d/tiktok?url=${encodeURIComponent(url)}`,
            extract: (data) => data?.data?.music ? { data: { music: data.data.music } } : null
        },
        {
            name: 'eliasar-yt-api',
            url: `https://eliasar-yt-api.vercel.app/api/search/tiktok?query=${encodeURIComponent(url)}`,
            extract: (data) => data?.results?.audio ? { data: { music: data.results.audio } } : null
        },
        {
            name: 'delirius-api',
            url: `https://delirius-apiofc.vercel.app/download/tiktok?url=${encodeURIComponent(url)}`,
            extract: (data) => data?.data?.audio ? { data: { music: data.data.audio } } : null
        }
    ];

    for (let i = 0; i < apis.length; i++) {
        const api = apis[i];
        try {
            console.log(`Trying API ${i + 1}/${apis.length}: ${api.name}`);

            const response = await fetch(api.url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                timeout: 10000
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const json = await response.json();
            const result = api.extract(json);

            if (result && result.data && result.data.music) {
                console.log(`✅ Success with API: ${api.name}`);
                return result;
            } else {
                console.log(`❌ No audio data from API: ${api.name}`);
            }
        } catch (error) {
            console.error(`❌ Error with API ${api.name}:`, error.message);

            // If this is the last API, wait a bit before giving up
            if (i < apis.length - 1) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }

    throw new Error("❌ Todos los servidores de TikTok están temporalmente no disponibles. Intenta de nuevo más tarde.");
}

// Función para convertir audio a MP3 con FFmpeg
async function convertAudio(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        exec(`ffmpeg -i "${inputPath}" -codec:a libmp3lame -qscale:a 2 "${outputPath}"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error en la conversión de audio: ${stderr}`);
                return reject(error);
            }
            resolve(true);
        });
    });
}