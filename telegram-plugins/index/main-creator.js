async function handler(m, { bot }) {
    let numcreador = '584146277368';
    let name = 'Barboza OFC';
    let about = 'Creador de bots de WhatsApp y del sᥲsᥙkᥱ ᑲ᥆𝗍 mძ 🌀';
    let empresa = 'Barboza- Servicios Tecnológicos';

    let caption = `
✨ *Información del Dueño:* ✨

*👤 Nombre:* ${name}
*📞 Número:* wa.me/${numcreador}
*📝 Descripción:* ${about}
*🏢 Empresa:* ${empresa}
*📧 Email:* sebastianbarbaro82@gmail.com
*📸 Instagram:* https://www.instagram.com/sebastian_barboza13
`;

    await bot.sendMessage(m.chat, caption);
}

handler.help = ['owner'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;
