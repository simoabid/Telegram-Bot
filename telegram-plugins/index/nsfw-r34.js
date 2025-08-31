import fetch from 'node-fetch';
const handler = async (m, { bot, args, usedPrefix }) => {
if (!args[0]) {
if (!global.db.data.chats[m.chat].nsfw && m.isGroup) {
    return bot.sendMessage(m.chat, '[❗] 𝐋𝐨𝐬 𝐜𝐨𝐦𝐚𝐧𝐝𝐨𝐬 +𝟏𝟖 𝐞𝐬𝐭𝐚́𝐧 𝐝𝐞𝐬𝐚𝐜𝐭𝐢𝐯𝐚𝐝𝐨𝐬 𝐞𝐧 𝐞𝐬𝐭𝐞 𝐠𝐫𝐮𝐩𝐨.\n> 𝐬𝐢 𝐞𝐬 𝐚𝐝𝐦𝐢𝐧 𝐲 𝐝𝐞𝐬𝐞𝐚 𝐚𝐜𝐭𝐢𝐯𝐚𝐫𝐥𝐨𝐬 𝐮𝐬𝐞 .enable nsfw', { reply_to_message_id: m.id });
    }
await bot.sendMessage(m.chat, '🚩 Ingresa el nombre de la imágen que estas buscando', { reply_to_message_id: m.id });
return;
}
const use = args[0];
const url = `https://rule34.xxx/index.php?page=dapi&s=post&q=index&json=1&tags=${use}`;
try {
await bot.sendMessage(m.chat, '🔍 Buscando imágenes...', { reply_to_message_id: m.id });
const response = await fetch(url);
const data = await response.json();
if (!data || data.length === 0) {
await bot.sendMessage(m.chat, `🚩 No hubo resultados para *${use}*`, { reply_to_message_id: m.id });
return;
}
const randomIndex = Math.floor(Math.random() * data.length);
const randomImage = data[randomIndex];
const urlimg = randomImage.file_url;
await bot.sendPhoto(m.chat, urlimg, {
    caption: `*Resultados De:* ${use}`,
    reply_to_message_id: m.id
});
} catch (error) {
console.error(error);
await bot.sendMessage(m.chat, `🚩 Ocurrió un error. ${error.message}`, { reply_to_message_id: m.id });
}};
handler.help = ['r34 <texto>'];
handler.command = ['r34', 'rule34'];
handler.tags = ['nsfw'];
// handler.estrellas = 2;
export default handler;