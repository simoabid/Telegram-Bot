import fs from 'fs';
const timeout = 60000;
const poin = 10;
const handler = async (m, {bot, usedPrefix}) => {
  bot.tekateki = bot.tekateki ? bot.tekateki : {};
  const id = m.chat;
  if (id in bot.tekateki) {
    bot.reply(m.chat, '*Todavía hay acertijos sin responder en este chat*', bot.tekateki[id][0]);
    throw false;
  }
  const tekateki = JSON.parse(fs.readFileSync(`./storage/game/acertijo.json`));
  const json = tekateki[Math.floor(Math.random() * tekateki.length)];
  const _clue = json.response;
  const clue = _clue.replace(/[A-Za-z]/g, '_');
  const caption = `
ⷮ💛 *ACERTIJOS*
✨️ *${json.question}*

⏱️ *Tiempo:* ${(timeout / 1000).toFixed(2)} Segundos
🎁 *Premio:* *+${poin}* Centavos 🪙`.trim();
  bot.tekateki[id] = [
    await bot.reply(m.chat, caption, m), json,
    poin,
    setTimeout(async () => {
      if (bot.tekateki[id]) await bot.reply(m.chat, `🌸 Se acabó el tiempo!\n*Respuesta:* ${json.response}`, bot.tekateki[id][0]);
      delete bot.tekateki[id];
    }, timeout)];
};
handler.help = ['acertijo'];
handler.tags = ['fun'];
handler.command = ['acertijo', 'acert', 'adivinanza', 'tekateki'];
export default handler;