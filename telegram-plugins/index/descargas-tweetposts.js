// By Jtxs 🐢
// https://whatsapp.com/channel/0029Vanjyqb2f3ERifCpGT0W

import axios from 'axios';

// Simplified Twitter search for Telegram - removed WhatsApp-specific interactive messages
let handler = async (m, { bot, text }) => {
if (!text) { return bot.sendMessage(m.chat, '🔎 Por favor, ingresa el texto de Lo que quieres buscar en Twitter', { reply_to_message_id: m.id }); }

try {
let api = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/Twitter-Posts`, {
  params: {text: encodeURIComponent(text)},
  headers: {'Content-Type': 'application/json'}
});

let json = api.data.result;

if (!json || json.length === 0) {
  return bot.sendMessage(m.chat, '❌ No se encontraron resultados para esa búsqueda.', { reply_to_message_id: m.id });
}

let resultsText = `🐦 *Resultados de Twitter para:* ${text}\n\n`;
for (let i = 0; i < Math.min(json.length, 5); i++) {
  let res = json[i];
  resultsText += `👤 *Usuario:* ${res.user}\n`;
  resultsText += `📅 *Post:* ${res.post}\n`;
  resultsText += `🔗 *Link:* ${res.user_link}\n\n`;
}

await bot.sendMessage(m.chat, resultsText, { reply_to_message_id: m.id });

let resultsToDisplay = json.slice(0, 7);

let mini = [];
for (let res of resultsToDisplay) {

let txt =  `👤 *User:* ${res.user}\n`
    txt += `📅 *Publicacion:* ${res.post}\n`
    txt += `☁️ *Perfil:* ${res.profile}\n`
    txt += `🔗 *Link:* ${res.user_link}\n`

mini.push({
body: proto.Message.InteractiveMessage.Body.create({text: null}),
footer: proto.Message.InteractiveMessage.Footer.create({text: null}),
header: proto.Message.InteractiveMessage.Header.create({title: `${txt}`,
hasMediaAttachment: true,
imageMessage: await createImage(res.profile)
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
buttons: []
})
});
}

const msg = generateWAMessageFromContent(m.chat, {viewOnceMessage: {
message: {
messageContextInfo: {deviceListMetadata: {},deviceListMetadataVersion: 4},
interactiveMessage: proto.Message.InteractiveMessage.create({
body: proto.Message.InteractiveMessage.Body.create({text: `👑 Resultado de : ${text}\n⪛✰ Tweetposts - Busquedas ✰⪜`}),
footer: proto.Message.InteractiveMessage.Footer.create({text: null}),
header: proto.Message.InteractiveMessage.Header.create({hasMediaAttachment: false}),
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.create({cards: mini})
})
}
}
}, {});

await bot.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

} catch (error) {
console.error(error)
}}

handler.help = ['tweetposts']
handler.tags = ['buscador']
handler.command = ['tweetposts']
handler.register = false
handler.chocolates = 1

export default handler;