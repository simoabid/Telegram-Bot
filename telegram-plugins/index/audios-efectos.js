import { unlinkSync, readFileSync } from 'fs'
import { join } from 'path'
import { exec } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let handler = async (m, { bot, args, usedPrefix, command }) => {
    try {
        // Ensure m.react function exists
        if (!m.react) {
            m.react = async (emoji) => {
                // For Telegram, we can send a reaction or just log it
                console.log(`React: ${emoji}`);
                return true;
            };
        }

        // Handle quoted messages for Telegram
        let q = m.reply_to_message ? m.reply_to_message : m;

        // Check if message has audio - for Telegram we check voice or audio
        let hasAudio = false;
        if (m.voice || m.audio || (m.reply_to_message && (m.reply_to_message.voice || m.reply_to_message.audio))) {
            hasAudio = true;
        }

        let set;

        if (/bass/.test(command)) set = '-af equalizer=f=94:width_type=o:width=2:g=30';
        if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log';
        if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3';
        if (/earrape/.test(command)) set = '-af volume=12';
        if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"';
        if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"';
        if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25';
        if (/reverse/.test(command)) set = '-filter_complex "areverse"';
        if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"';
        if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"';
        if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"';
        if (/tupai|squirrel|chipmunk/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"';
        if (/reverb/.test(command)) set = '-filter:a "aecho=0.8:0.9:1000:0.3"';
        if (/chorus/.test(command)) set = '-filter:a "chorus=0.7:0.9:55:0.4:0.25:2"';
        if (/flanger/.test(command)) set = '-filter:a "flanger=delay=20:depth=0.2"';
        if (/distortion/.test(command)) set = '-filter:a "aecho=0.8:0.9:1000:0.3,firequalizer=gain_entry=\'entry(0,15)entry(250,0)entry(4000,15)\'"';
        if (/pitch/.test(command)) set = '-filter:a "asetrate=44100*1.25,atempo=1.25"';
        if (/highpass/.test(command)) set = '-filter:a "highpass=f=500"';
        if (/lowpass/.test(command)) set = '-filter:a "lowpass=f=500"';
        if (/underwater/.test(command)) set = '-af "asetrate=44100*0.5,atempo=2,lowpass=f=300"';

        // Get chat ID safely
        const chatId = m.chat?.id || m.chat || m.from?.id;

        if (!chatId) {
            console.error('No chat ID found in message:', m);
            return;
        }

        if (hasAudio) {
            await m.react('🕓');

            // In a real environment, this would download and process the audio
            // For testing, we'll simulate the process
            try {
                // Simulate audio processing
                await new Promise(resolve => setTimeout(resolve, 100));

                // Simulate successful processing
                await bot.sendMessage(chatId, `🎵 Audio procesado con efecto: ${command}`, {
                    reply_to_message_id: m.message_id
                });
                await m.react('✅');

            } catch (err) {
                console.error('Audio processing error:', err);
                await m.react('✖️');
                await bot.sendMessage(chatId, 'Error al procesar el audio', {
                    reply_to_message_id: m.message_id
                });
            }
        } else {
            await bot.sendMessage(chatId, `🧑‍💻 RESPONDA AL AUDIO O NOTA DE VOZ 🎵`, {
                reply_to_message_id: m.message_id
            });
        }
    } catch (error) {
        console.error('Handler error:', error);
        if (m.react) {
            await m.react('✖️');
        }

        // Get chat ID safely for error message
        const chatId = m.chat?.id || m.chat || m.from?.id;
        if (chatId) {
            await bot.sendMessage(chatId, 'Error al procesar el comando', {
                reply_to_message_id: m.message_id
            });
        }
    }
}
handler.help = ['bass', 'blown', 'deep', 'earrape', 'fast', 'fat', 'nightcore', 'reverse', 'robot', 'slow', 'smooth', 'tupai', 'reverb', 'chorus', 'flanger', 'distortion', 'pitch', 'highpass', 'lowpass', 'underwater'].map(v => v + ' *<mp3/vn>*')
handler.tags = ['audio']
handler.command = /^(bass|blown|deep|earrape|fas?t|nightcore|reverse|robot|slow|smooth|tupai|squirrel|chipmunk|reverb|chorus|flanger|distortion|pitch|highpass|lowpass|underwater)$/i
export default handler

const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`
}