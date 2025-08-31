import fetch from 'node-fetch';

let handler = async (m, { bot, args, usedPrefix, command }) => {
  if (!args[0]) {
    return m.reply(`🎩 Ingrese una URL de TikTok\n*Ejemplo:* ${usedPrefix + command} https://vm.tiktok.com/ZMh3KL31o/`);
  }

  const tiktokUrl = args[0];

  if (!tiktokUrl.match(/tiktok\.com\//i)) {
    return m.reply('❌ La URL proporcionada no parece ser una URL de TikTok válida.');
  }

  try {
    m.react('🕑'); 

    let api = `https://eliasar-yt-api.vercel.app/api/search/tiktok?query=${encodeURIComponent(tiktokUrl)}`;
    let response = await fetch(api);

    if (!response.ok) {
      console.error(`API respondió con estado: ${response.status} ${response.statusText}`);
      try {
        const errorJson = await response.json();
        console.error('Detalles del error de la API:', errorJson);
        return m.reply(`❌ La API de TikTok devolvió un error: ${errorJson.message || 'Error desconocido'}`);
      } catch (parseError) {
        return m.reply(`❌ La API de TikTok devolvió un error (Estado: ${response.status}). Intenta de nuevo más tarde.`);
      }
    }

    let json = await response.json();
    
    let res = json.results; 

    if (!res || !res.audio) {
      return m.reply('❌ No se encontró el audio para esta URL de TikTok. La API no devolvió el campo de audio esperado.');
    }

    let aud = res.audio;
    let title = res.title || 'Audio de TikTok'; 

    await bot.sendMessage(m.chat, {
      audio: { url: aud },
      mimetype: 'audio/mpeg',
      fileName: `${title}.mp3`, 
      ptt: false 
    }, { quoted: m });

    m.react('✅'); 

  } catch (e) {
    console.error('Error al obtener el audio de TikTok:', e); 
    m.reply(`❌ Ocurrió un error al obtener el audio de TikTok: ${e.message}. Intenta de nuevo más tarde.`);
    m.react('✖️'); 
  }
}

// Changed commands to avoid conflict with descargas-tiktok_mp3.js
handler.command = ['bttmp3', 'barbozamp3'];

export default handler;
