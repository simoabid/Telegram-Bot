import axios from "axios";

let handler = async (m, { bot, usedPrefix, command }) => {
    let cristiano = (
        await axios.get(`https://raw.githubusercontent.com/davidprospero123/api-anime/main/BOT-JSON/CristianoRonaldo.json`)
    ).data;

    let ronaldo = cristiano[Math.floor(Math.random() * cristiano.length)];

    // Send photo with inline keyboard for Telegram
    await bot.sendPhoto(m.chat, ronaldo, {
        caption: "*CR7*",
        reply_to_message_id: m.id,
        reply_markup: {
            inline_keyboard: [[
                { text: "⚽ Ver más", callback_data: `${usedPrefix + command}` }
            ]]
        }
    });
};

handler.help = ["cr7"];
handler.tags = ["anime"];
handler.command = /^(ronaldo|cr7)$/i;

export default handler;