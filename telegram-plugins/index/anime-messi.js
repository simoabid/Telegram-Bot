
import axios from "axios";

let handler = async (m, { bot}) => {
  let res = (await axios.get(`https://raw.githubusercontent.com/davidprospero123/api-anime/main/BOT-JSON/Messi.json`)).data;
  let url = res[Math.floor(Math.random() * res.length)];

  await bot.sendPhoto(m.chat, url, {
    caption: "*Messi*",
    reply_to_message_id: m.id
  });
};

handler.help = ['messi'];
handler.tags = ['anime'];
handler.command = /^(messi)$/i;
handler.premsub = true

export default handler;