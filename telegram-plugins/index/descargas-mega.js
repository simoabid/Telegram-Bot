import { File } from "megajs";
import path from "path";

const botName = 'Descarga de MEGA';

let handler = async (m, { bot, args, usedPrefix, text, command }) => {
    try {
        // Ensure m.react function exists
        if (!m.react) {
            m.react = async (emoji) => {
                console.log(`React: ${emoji}`);
                return true;
            };
        }

        // Get chat ID safely
        const chatId = m.chat?.id || m.chat || m.from?.id;

        if (!chatId) {
            console.error('No chat ID found in message:', m);
            return;
        }

        if (!text) {
            return await bot.sendMessage(chatId, `\`\`\`[ 💨 ] Uso correcto del comando:\`\`\` ${usedPrefix + command} https://mega.nz/file/ovJTHaQZ#yAbkrvQgykcH_NDKQ8eIc0zvsN7jonBbHZ_HTQL6lZ8`, {
                reply_to_message_id: m.message_id || m.id
            });
        }

        // Validate MEGA URL
        if (!text.includes('mega.nz')) {
            return await bot.sendMessage(chatId, 'Error: Por favor proporciona un enlace válido de MEGA', {
                reply_to_message_id: m.message_id || m.id
            });
        }

        await m.react('🕓'); // Loading reaction

        const file = File.fromURL(text);
        await file.loadAttributes();

        if (file.size >= 300000000) {
            await m.react('✖️');
            return await bot.sendMessage(chatId, 'Error: El archivo es demasiado pesado (Peso máximo: 300MB (Premium: 800MB))', {
                reply_to_message_id: m.message_id || m.id
            });
        }

        const caption = `   *--- ${botName} ---*\nFile: ${file.name}\nSize: ${formatBytes(file.size)}\n> sᥲsᥙkᥱ ᑲ᥆𝗍 mძ 🌀`;

        const data = await file.downloadBuffer();

        const fileExtension = path.extname(file.name).toLowerCase();
        const mimeTypes = {
            ".mp4": "video/mp4",
            ".pdf": "application/pdf",
            ".zip": "application/zip",
            ".rar": "application/x-rar-compressed",
            ".7z": "application/x-7z-compressed",
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
        };

        let mimetype = mimeTypes[fileExtension] || "application/octet-stream";

        // Send document using proper Telegram format
        await bot.sendDocument(chatId, data, {
            caption: caption,
            reply_to_message_id: m.message_id || m.id,
            filename: file.name
        });

        await m.react('✅'); // Success reaction

    } catch (error) {
        console.error('MEGA download error:', error);

        if (m.react) {
            await m.react('✖️');
        }

        // Get chat ID safely for error message
        const chatId = m.chat?.id || m.chat || m.from?.id;
        if (chatId) {
            await bot.sendMessage(chatId, `Error: ${error.message}`, {
                reply_to_message_id: m.message_id || m.id
            });
        }
    }
};

handler.help = ["mega"];
handler.tags = ["descargas"];
handler.command = /^(mega)$/i;

export default handler;

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}