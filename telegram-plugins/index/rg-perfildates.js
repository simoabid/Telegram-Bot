let handler = async(m, { bot, usedPrefix, command }) => {

let txt = `ᰔᩚ mᥲᥒᥙᥲᥣ ⍴ᥲrᥲ ᥱძі𝗍ᥲr 𝗍ᥙ ⍴ᥱr𝖿іᥣ ♡\n\n`;
    txt += `❀ *${usedPrefix}setbirth* <edita tu fecha de cumpleaños 🎂>\n`
    txt += `❀ *${usedPrefix}setdescription* <edita La descripción de tu perfil>\n`
    txt += `❀ *${usedPrefix}setgenre* <edita tu genero en tu perfil>\n`
    txt += `❀ *${usedPrefix}marry* <cásate con una persona>\n\n`
    txt += `┅┅┅┅┅┅┅༻❁༺┅┅┅┅┅┅┅`;

bot.reply(m.chat, txt, m, {});
m.react('🍫');
}

handler.command = ['perfildates', 'pedates', 'perd'];
handler.tag = ['rg'];
handler.help = ['perfildates'];

export default handler;
