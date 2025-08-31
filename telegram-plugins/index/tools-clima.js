let handler = async (m, { bot, command }) => {
if (!m.quoted) return m.reply(`《★》Responde a un mensaje para ${command === 'pin' ? 'fijarlo' : 'desfijarlo'}.`);
try {
let messageKey = {remoteJid: m.chat,
fromMe: m.quoted.fromMe,
id: m.quoted.id,
participant: m.quoted.sender
};

if (command === 'pin' || command === 'fijar') {
await bot.sendMessage(m.chat, { pin: messageKey,type: 1, time: 604800 })
//bot.sendMessage(m.chat, {pin: {type: 1, time: 604800, key: messageKey }});
m.react("✅️")
}

if (command === 'unpin' || command === 'desfijar') {
await bot.sendMessage(m.chat, { pin: messageKey,type: 2, time: 86400 })
//bot.sendMessage(m.chat, { pin: { type: 0, key: messageKey }});
m.react("✅️")
}

if (command === 'destacar') {
bot.sendMessage(m.chat, {keep: messageKey, type: 1, time: 15552000 })
m.react("✅️")
}

if (command === 'desmarcar') {
bot.sendMessage(m.chat, {keep: messageKey, type: 2, time: 86400 })
m.react("✅️")
}
} catch (error) {
console.error(error);
}};
handler.help = ['pin']
handler.tags = ['grupo']
handler.command = ['fijar', 'unpin', 'desfijar', 'destacar', 'desmarcar'] 
handler.admin = true
handler.group = true
handler.botAdmin = false
// handler.register = false
export default handler