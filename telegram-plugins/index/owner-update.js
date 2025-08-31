import { execSync } from 'child_process'
let handler = async (m, { bot, text }) => {
await m.react('🕓')
if (bot.user.jid == bot.user.jid) {
let stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : ''))
await bot.reply(m.chat, stdout.toString(), m)
await m.react('✅')
}}
handler.help = ['update']
handler.tags = ['owner']
handler.command = ['update', 'actualizar', 'fix', 'fixed'] 
handler.rowner = true

export default handler