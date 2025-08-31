import axios from 'axios';
import * as cheerio from 'cheerio';

let handler = async (m, { bot, text, usedPrefix, command }) => {
try {
if (!text) throw bot.reply(m.chat, `⛄ *Formato incorrecto*\n*Ejemplo:*\n\n${usedPrefix + command}  TV Pantalla plana`, m, {});
let res = await mercado(text);
let libre = '`⛄ M E R C A D O - L I B R E ⛄`\n\n';
const limit = 15;
for (let i = 0; i < limit && i < res.length; i++) {
let link = res[i].link.length > 30 ? res[i].link.substring(0, 30) + '...' : res[i].link;
libre += `*• Nombre:* ${res[i].title}\n*• Estado:* ${res[i].state}\n*• Link:* ${res[i].link}\n`;
libre += '\n' + '••••••••••••••••••••••••' + '\n';
}
bot.reply(m.chat, libre, m, {})
} catch (error) {
}};
handler.help = ['mercadolibre <búsqueda>']
handler.tags = ['buscador']
handler.command = ['mercadolibre']
handler.estrellas = 2
handler.register = false
export default handler;

async function mercado(query) {
try {
const url = `https://listado.mercadolibre.com.pe/${query}`;
const response = await axios.get(url);
const html = response.data;
const $ = cheerio.load(html);
const results = $('.ui-search-layout__item').map((i, element) => {
const title = $(element).find('.ui-search-item__title').text();
const state = $(element).find('.ui-search-item__group__element').last().text().trim();
const link = $(element).find('a').attr('href');
return {
title,
state,
link
};
}).get();
return results;
} catch (error) {
}}