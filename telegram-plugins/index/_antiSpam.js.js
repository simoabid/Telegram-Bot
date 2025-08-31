import {performance} from 'perf_hooks';
const handler = async (m, {bot, text}) => {
const start = performance.now();    
const end = performance.now();
const executionTime = (end - start);
async function loading() {
    try {
        var hawemod = [
            "Injecting Malware",
            " █ 10%",
            " █ █ 20%",
            " █ █ █ 30%",
            " █ █ █ █ 40%",
            " █ █ █ █ █ 50%",
            " █ █ █ █ █ █ 60%",
            " █ █ █ █ █ █ █ 70%",
            " █ █ █ █ █ █ █ █ 80%",
            " █ █ █ █ █ █ █ █ █ 90%",
            " █ █ █ █ █ █ █ █ █ █ 100%",
            "System hyjacking on process.. \\n Conecting to Server error to find 404 ",
            "Device successfully botected... \\n Riciving data...",
            "Data hyjacked from divice 100% completed \\n killing all evidence killing all malwares...",
            " HACKING COMPLETED ",
            " SENDING LOG DOCUMENTS...",
            " SUCCESSFULLY SENT DATA AND Connection disbotected",
            "BACKLOGS CLEARED"
        ];

        let sentMessage = await bot.sendMessage(m.chat, `*☠ ¡¡Starting doxxing!! ☠*`)

        for (let i = 0; i < hawemod.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            try {
                await bot.editMessageText(hawemod[i], {
                    chat_id: m.chat,
                    message_id: sentMessage.message_id
                });
            } catch (error) {
                // If edit fails, send new message
                await bot.sendMessage(m.chat, hawemod[i]);
            }
        }
    } catch (error) {
        console.error('Error in doxxing command:', error);
        await bot.sendMessage(m.chat, '❌ Error al ejecutar el comando');
    }
}
loading()    
};
handler.help = ['doxxing <nombre> | <@tag>'];
handler.tags = ['fun'];
handler.command = /^doxxing/i;
export default handler;

function getRandomValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}