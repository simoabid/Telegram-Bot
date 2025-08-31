import fetch from 'node-fetch';

let handler = async(m, { bot, text, usedPrefix, command }) => {

if (!text) return bot.sendMessage(m.chat, '🍭 Ingresa Un Nombre De Un Pais', { reply_to_message_id: m.id });

try {
let api = `https://delirius-apiofc.vercel.app/tools/flaginfo?query=${text}`;

let response = await fetch(api);
let json = await response.json();
let datas = json.data;

let park = `*Información De:* ${text}\n\n*Nombre Oficial:* ${datas.officialName}\n*Organización:* ${datas.memberOf}\n*Capital:* ${datas.capitalCity}\n*Continente:* ${datas.continent}\n*Población:* ${datas.population}\n*Prefijo:* ${datas.callingCode}\n*Moneda:* ${datas.currency}\n*Descripción:* ${datas.description}`;

let img = datas.image;

bot.sendPhoto(m.chat, img, { caption: park, reply_to_message_id: m.id });

} catch (e) {
m.reply(`*Error:* ${e.message}`);
m.react('✖️');
  }
};

handler.help = ['flag <nombre de un país>'];
handler.tag = ['buscador'];
handler.command = ['paisinfo', 'flag'];

export default handler;