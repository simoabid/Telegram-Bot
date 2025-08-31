import fetch from 'node-fetch';
const handler = async (m, {bot, text, usedPrefix, command}) => {
if (!text) throw `*🧑‍💻 ingrese la URL de la imagen.*`;
await bot.sendMessage(m.chat, '🕒 Procesando...', { reply_to_message_id: m.id });
await bot.sendMessage(m.chat, '*🧑‍💻 Eliminando, Espere Un Momento...*', { reply_to_message_id: m.id });
try {
const formData = new FormData();
formData.append("size", "auto");
formData.append("image_url", text);
const response = await fetch("https://api.remove.bg/v1.0/removebg", {
method: "POST",
headers: { "X-Api-Key": "pZoqmwkwmMSJAVdJFDnMgWB8" },
body: formData,
});
if (!response.ok) throw new Error('Network response was not ok');
const buffer = await response.arrayBuffer();
await bot.sendMessage(m.chat, '☑️ Completado', { reply_to_message_id: m.id });
await bot.sendPhoto(m.chat, Buffer.from(buffer), { reply_to_message_id: m.id });
} catch (error) {
throw `Error: ${error.message}`;
}
}
handler.tags = ['tools'];
handler.help = ['removebg'];
handler.command = ['removebg','bg'];
export default handler;