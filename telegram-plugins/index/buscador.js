// Alex-X >> https://github.com/OfcKing

import fs from 'fs';
import path from 'path';

var handler = async (m, { usedPrefix, command }) => {
    try {
        await m.react('🕒'); 
        bot.sendPresenceUpdate('composing', m.chat);

        const pluginsDir = './plugins';

        const files = fs.readdirSync(pluginsDir).filter(file => file.endsWith('.js'));

        let response = `📂 *Revisión de Syntax Errors:*\n\n`;
        let hasErrors = false;

        for (const file of files) {
            try {
                await import(path.resolve(pluginsDir, file));
            } catch (error) {
                hasErrors = true;
                response += `🚩 *Error en:* ${file}\n${error.message}\n\n`;
            }
        }

        if (!hasErrors) {
            response += '✅ ¡Todo está en orden! No se detectaron errores de sintaxis.';
        }

        await bot.reply(m.chat, response, m);
        await m.react('✅');
    } catch (err) {
        await m.react('✖️'); 
        console.error(err);
        bot.reply(m.chat, '🚩 *Ocurrió un fallo al verificar los plugins.*', m,{});
    }
};

handler.command = ['rev'];
handler.help = ['rev'];
handler.tags = ['tools'];

export default handler;