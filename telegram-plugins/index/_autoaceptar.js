let handler = m => m

handler.before = async function (m, {bot, isAdmin, isBotAdmin}) {
if (!m.isGroup) return !1
let chat = global.db.data.chats[m.chat]
if (chat.autoAceptar && !isAdmin) {
    if (!isBotAdmin) return !0
        const participants = await bot.groupRequestParticipantsList(m.chat)
        const latinPrefix = '5'
        const filteredParticipants = participants.filter(p => p.jid.includes('') && p.jid.split('@')[0].startsWith(latinPrefix))
        for (const participant of filteredParticipants) {
            await bot.groupRequestParticipantsUpdate(m.chat, [participant.jid], "approve")
        }
        if (m.messageStubType === 172 && m.messageStubParameters) {
            const [jid] = m.messageStubParameters
            if (jid.includes('') && jid.split('@')[0].startsWith(latinPrefix)) {
                await bot.groupRequestParticipantsUpdate(m.chat, [jid], "approve")}}
}}
export default handler