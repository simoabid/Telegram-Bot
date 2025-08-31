import axios from "axios";
import FormData from "form-data";
import * as cheerio from 'cheerio';

let handler = async (m, { bot, usedPrefix, command, text, args }) => {
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
      return await bot.sendMessage(chatId, '*`Ingresa El link Del vídeo a descargar ✨`*', {
        reply_to_message_id: m.message_id || m.id
      });
    }

    let data = await tiktokdl(text);
    console.log(data);

    if (!data.status) {
      await m.react('✖️');
      return await bot.sendMessage(chatId, 'Error al procesar el enlace de TikTok', {
        reply_to_message_id: m.message_id || m.id
      });
    }

    let start = Date.now();
    let sp = (Date.now() - start) + 'ms';
    let cap = `*\`[ TIKTOK CALIDAD NORMAL ]\`*`;
    let capp = `*\`[ TIKTOK CALIDAD HD ]\`*`;

    await m.react('🕓');

    // Send normal quality video
    if (data.server1?.url) {
      await bot.sendVideo(chatId, data.server1.url, {
        caption: cap,
        reply_to_message_id: m.message_id || m.id
      });
    }

    // Send HD quality video
    if (data.serverHD?.url) {
      await bot.sendVideo(chatId, data.serverHD.url, {
        caption: capp,
        reply_to_message_id: m.message_id || m.id
      });
    }

    await m.react('✅');

  } catch (error) {
    console.error('TikTok download error:', error);

    if (m.react) {
      await m.react('✖️');
    }

    // Get chat ID safely for error message
    const chatId = m.chat?.id || m.chat || m.from?.id;
    if (chatId) {
      await bot.sendMessage(chatId, 'Error al descargar el video de TikTok', {
        reply_to_message_id: m.message_id || m.id
      });
    }
  }
}
handler.help = ['tiktok2 *<link>*']
//handler.yenes = 2
handler.tags = ['descargas']
handler.command = /^(tiktok2)$/i;

export default handler

async function tiktokdl(url) {
    let result = {};
    let form = new FormData();
    form.append("q", url);
    form.append("lang", "id");

    try {
        let { data } = await axios("https://savetik.co/api/ajaxSearch", {
            method: "post",
            data: form,
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "User-Agent": "PostmanRuntime/7.32.2"
            }
        });

        let $ = cheerio.load(data.data);

        result.status = true;
        result.caption = $("div.video-data > div > .tik-left > div > .content > div > h3").text();
        result.server1 = {
            quality: "MEDIUM",
            url: $("div.video-data > div > .tik-right > div > p:nth-child(1) > a").attr("href")
        };
        result.serverHD = {
            quality: $("div.video-data > div > .tik-right > div > p:nth-child(3) > a").text().split("MP4 ")[1],
            url: $("div.video-data > div > .tik-right > div > p:nth-child(3) > a").attr("href")
        };
        result.audio = $("div.video-data > div > .tik-right > div > p:nth-child(4) > a").attr("href");

    } catch (error) {
        result.status = false;
        result.message = error;
        console.log(result);
    }

    return result;
}