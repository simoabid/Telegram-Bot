let handler = async (m, { bot, text, command }) => {
let id = text ? text : m.chat  
let chat = global.db.data.chats[m.chat]
chat.welcome = false
await bot.reply(id, `🚩 *sᥲsᥙkᥱ ᑲ᥆𝗍 mძ 🌀* Abandona El Grupo, Fué Genial Estar Aquí 👋`) 
await bot.groupLeave(id)
try {  
chat.welcome = true
} catch (e) {
await m.reply(`${fg}`) 
return console.log(e)
}}
handler.command = /^(salir|leavegc|salirdelgrupo|leave)$/i
handler.group = true
handler.rowner = true
export default handler