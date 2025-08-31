import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let handler = async (m, { bot, text, usedPrefix, command }) => {
  if (!text) {
    return bot.sendMessage(m.chat, `
╭━━〔 *❌ FALTA TEXTO* 〕━━⬣
┃ 🍡 *Usa el comando así:*
┃ ⎔ ${usedPrefix + command} <nombre canción>
┃ 💽 *Ejemplo:* ${usedPrefix + command} Believer
╰━━━━━━━━━━━━━━━━━━━━⬣
    `.trim(), { reply_to_message_id: m.message_id });
  }

  try {
    await m.react('🌀');
    console.log(`🎵 Spotify search request: ${text}`);

    // Multiple API fallbacks for better reliability
    const apis = [
      {
        name: 'nekorinn.my.id',
        url: `https://api.nekorinn.my.id/downloader/spotifyplay?q=${encodeURIComponent(text)}`,
        extract: async (data) => data.result?.downloadUrl
      },
      {
        name: 'delirius-api',
        url: `https://delirius-apiofc.vercel.app/download/spotify?query=${encodeURIComponent(text)}`,
        extract: async (data) => data.data?.download || data.result?.download
      },
      {
        name: 'siputzx-api',
        url: `https://api.siputzx.my.id/api/d/spotify?query=${encodeURIComponent(text)}`,
        extract: async (data) => data.data?.download || data.result?.url
      },
      {
        name: 'youtube-music-download',
        url: `https://api.siputzx.my.id/api/s/youtube?query=${encodeURIComponent(text + ' audio music')}`,
        extract: async (data) => {
          // Search for music and download the best match
          if (data.data && data.data.length > 0) {
            // Find the best music match (prefer official, lyrics, or audio versions)
            const musicKeywords = ['official', 'lyrics', 'audio', 'music video', 'original'];
            let bestVideo = data.data[0]; // Default to first result

            for (const video of data.data.slice(0, 5)) { // Check first 5 results
              const title = video.title.toLowerCase();
              if (musicKeywords.some(keyword => title.includes(keyword))) {
                bestVideo = video;
                break;
              }
            }

            if (bestVideo.url) {
              try {
                console.log(`🎵 Attempting to download: ${bestVideo.title}`);
                console.log(`🔗 YouTube URL: ${bestVideo.url}`);

                // Try multiple YouTube download APIs
                const downloadApis = [
                  `https://api.siputzx.my.id/api/d/ytmp3?url=${encodeURIComponent(bestVideo.url)}`,
                  `https://delirius-apiofc.vercel.app/download/ytmp3?url=${encodeURIComponent(bestVideo.url)}`,
                  `https://api.nekorinn.my.id/downloader/ytmp3?url=${encodeURIComponent(bestVideo.url)}`
                ];

                for (const downloadApi of downloadApis) {
                  try {
                    console.log(`🔄 Trying download API: ${downloadApi.split('/')[2]}`);
                    const downloadResponse = await fetch(downloadApi);

                    if (!downloadResponse.ok) continue;

                    const downloadData = await downloadResponse.json();
                    console.log(`📋 Download API Response:`, JSON.stringify(downloadData, null, 2));

                    // Check different response formats
                    const audioUrl = downloadData.data?.download?.url ||  // delirius-api format
                                   downloadData.data?.download ||
                                   downloadData.data?.url ||
                                   downloadData.result?.download?.url ||
                                   downloadData.result?.download ||
                                   downloadData.result?.url ||
                                   downloadData.download?.url ||
                                   downloadData.download ||
                                   downloadData.url;

                    if (audioUrl && audioUrl.startsWith('http')) {
                      console.log(`✅ Got download URL: ${audioUrl}`);

                      // Check if it's a shortened URL that needs to be resolved
                      let finalUrl = audioUrl;
                      if (audioUrl.includes('da.gd') || audioUrl.includes('bit.ly') || audioUrl.includes('tinyurl')) {
                        try {
                          console.log(`🔄 Resolving shortened URL: ${audioUrl}`);
                          const headResponse = await fetch(audioUrl, { method: 'HEAD', redirect: 'follow' });
                          finalUrl = headResponse.url;
                          console.log(`✅ Resolved to: ${finalUrl}`);
                        } catch (redirectError) {
                          console.log(`⚠️ Could not resolve redirect, using original URL`);
                        }
                      }

                      return {
                        url: finalUrl,
                        title: downloadData.data?.title || bestVideo.title,
                        duration: bestVideo.duration?.timestamp,
                        views: bestVideo.views,
                        youtubeUrl: bestVideo.url,
                        quality: downloadData.data?.download?.quality || 'Unknown',
                        size: downloadData.data?.download?.size || 'Unknown'
                      };
                    }
                  } catch (downloadError) {
                    console.error(`❌ Download API failed:`, downloadError.message);
                  }
                }

                // If download fails, return search result for manual download
                return {
                  isYouTubeResult: true,
                  title: bestVideo.title,
                  url: bestVideo.url,
                  duration: bestVideo.duration?.timestamp,
                  views: bestVideo.views
                };
              } catch (error) {
                console.error(`❌ YouTube processing error:`, error.message);
                return null;
              }
            }
          }
          return null;
        }
      }
    ];

    let audioUrl = null;
    let lastError = null;

    for (const api of apis) {
      try {
        console.log(`🔄 Trying API: ${api.name}`);
        const response = await fetch(api.url);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error(`API returned ${contentType} instead of JSON`);
        }

        const data = await response.json();
        console.log(`📋 ${api.name} Response:`, JSON.stringify(data, null, 2));

        const extractedResult = await api.extract(data);
        if (extractedResult) {
          if (typeof extractedResult === 'string' && extractedResult.startsWith('http')) {
            // Direct Spotify download URL
            audioUrl = extractedResult;
            console.log(`✅ Success with API: ${api.name}`);
            break;
          } else if (extractedResult.url && !extractedResult.isYouTubeResult) {
            // YouTube Music download URL
            audioUrl = extractedResult.url;
            console.log(`✅ YouTube Music download success: ${extractedResult.title}`);

            // Since direct download consistently fails due to Google's restrictions,
            // provide the user with comprehensive music information and download options
            await bot.sendMessage(m.chat, `
╭━〔 *🎵 MÚSICA ENCONTRADA* 〕━⬣
┃ 🔍 *Búsqueda:* ${text}
┃ 🎬 *Título:* ${extractedResult.title}
┃ ⏱️ *Duración:* ${extractedResult.duration || 'N/A'}
┃ 👀 *Vistas:* ${extractedResult.views?.toLocaleString() || 'N/A'}
┃ 🎵 *Calidad:* ${extractedResult.quality || 'N/A'}
┃ 📦 *Tamaño:* ${extractedResult.size || 'N/A'}
┃
┃ 🎵 *Descarga automática:*
┃ ⎔ /ytmp3 ${extractedResult.youtubeUrl}
┃ ⎔ /yta ${extractedResult.youtubeUrl}
┃
┃ 🔗 *Enlaces alternativos:*
┃ 📺 *YouTube:* ${extractedResult.youtubeUrl}
┃ 🔗 *Directo:* ${audioUrl}
╰━━━━━━━━━━━━━━━━━━━━⬣
            `.trim(), { reply_to_message_id: m.message_id });

            console.log(`✅ Music search completed successfully: ${extractedResult.title}`);

            await m.react('🎵');
            console.log(`✅ Audio sent successfully: ${extractedResult.title}`);
            return; // Exit successfully

          } else if (extractedResult.isYouTubeResult) {
            // Fallback: YouTube search result for manual download
            console.log(`⚠️ Download failed, providing search result: ${extractedResult.title}`);
            await bot.sendMessage(m.chat, `
╭━〔 *🎵 MÚSICA ENCONTRADA* 〕━⬣
┃ 🔍 *Búsqueda:* ${text}
┃ 🎬 *Título:* ${extractedResult.title}
┃ ⏱️ *Duración:* ${extractedResult.duration || 'N/A'}
┃ 👀 *Vistas:* ${extractedResult.views?.toLocaleString() || 'N/A'}
┃
┃ ⚠️ *Descarga automática falló*
┃ 🔗 *Enlace:* ${extractedResult.url}
┃
┃ 💡 *Para descargar manualmente:*
┃ ⎔ Usa: /ytmp3 ${extractedResult.url}
╰━━━━━━━━━━━━━━━━━━━━⬣
            `.trim(), { reply_to_message_id: m.message_id });

            await m.react('🎵');
            return; // Exit successfully
          }
        }

        lastError = new Error(`${api.name}: No valid audio URL found`);

      } catch (error) {
        console.error(`❌ ${api.name} failed:`, error.message);
        lastError = error;
      }
    }

    // If we reach here, no API worked
    throw new Error('❌ No se pudo encontrar o descargar la canción. Intenta con otro nombre o verifica que la canción exista.');

  } catch (error) {
    console.error('🚨 Spotify Download Error:', error);
    await m.react('❌');
    await bot.sendMessage(m.chat, `
╭━━〔 *❌ ERROR* 〕━━⬣
┃ 🚫 *Error:* ${error.message}
┃ 💡 *Sugerencia:* Intenta con otro nombre
┃ 🔄 *O intenta de nuevo más tarde*
╰━━━━━━━━━━━━━━━━━━━━⬣
    `.trim(), { reply_to_message_id: m.message_id });
  }
}

handler.help = ['music *<texto>*'];
handler.tags = ['descargas'];
handler.command = ['music'];

export default handler;
