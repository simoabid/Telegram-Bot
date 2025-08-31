const handler = async (m, { bot, usedPrefix }) => {
  try {
    const userId = m.from_user?.id || m.chat;

    // Initialize user data if not exists
    if (!global.db.data.users[userId]) {
      global.db.data.users[userId] = { lastcofre: 0 };
    }

    let img = 'https://cdn-sunflareteam.vercel.app/images/fe2072569a.jpg';
    let texto = `🔊 *AUDIO & MUSIC MENU* 🎵

🎵 *MUSIC DOWNLOADS*
• ${usedPrefix}play <song> - Search and download music
• ${usedPrefix}play1 <song> - Alternative music search
• ${usedPrefix}play2 <song> - SoundCloud alternative
• ${usedPrefix}playvid <song> - Play video version
• ${usedPrefix}splay <song> - Spotify play
• ${usedPrefix}sp <song> - Spotify short
• ${usedPrefix}music <song> - Music downloader
• ${usedPrefix}ytmp3 <url> - YouTube audio downloader

🎤 *VOICE & SPEECH*
• ${usedPrefix}tts <text> - Text to speech
• ${usedPrefix}voice <text> - Voice synthesis
• ${usedPrefix}speak <text> - Make bot speak
• ${usedPrefix}voicechanger <audio> - Change voice
• ${usedPrefix}pitch <audio> - Adjust pitch
• ${usedPrefix}speed <audio> - Change playback speed
• ${usedPrefix}robot <audio> - Robot voice effect

🎧 *AUDIO EFFECTS*
• ${usedPrefix}bass <audio> - Bass boost effect

🎼 *MUSIC EFFECTS*
• ${usedPrefix}echo <audio> - Echo effect
• ${usedPrefix}reverb <audio> - Reverb effect
• ${usedPrefix}distortion <audio> - Distortion effect
• ${usedPrefix}flanger <audio> - Flanger effect
• ${usedPrefix}chorus <audio> - Chorus effect
• ${usedPrefix}phaser <audio> - Phaser effect
• ${usedPrefix}tremolo <audio> - Tremolo effect
• ${usedPrefix}vibrato <audio> - Vibrato effect

🔇 *AUDIO PROCESSING*
• ${usedPrefix}normalize <audio> - Normalize volume
• ${usedPrefix}compress <audio> - Audio compression
• ${usedPrefix}amplify <audio> - Amplify audio
• ${usedPrefix}fade <audio> - Fade in/out
• ${usedPrefix}trim <audio> - Trim audio
• ${usedPrefix}loop <audio> - Loop audio
• ${usedPrefix}merge <audios> - Merge audio files
• ${usedPrefix}split <audio> - Split audio

🎨 *AUDIO FILTERS*
• ${usedPrefix}lowpass <audio> - Low-pass filter
• ${usedPrefix}highpass <audio> - High-pass filter
• ${usedPrefix}bandpass <audio> - Band-pass filter
• ${usedPrefix}notch <audio> - Notch filter
• ${usedPrefix}equalizer <audio> - Equalizer
• ${usedPrefix}limiter <audio> - Audio limiter
• ${usedPrefix}gate <audio> - Noise gate
• ${usedPrefix}deesser <audio> - De-esser

🎹 *MUSIC GENERATION*
• ${usedPrefix}generate-music <style> - AI music generation
• ${usedPrefix}melody <key> - Generate melodies
• ${usedPrefix}beat <style> - Create beats
• ${usedPrefix}chord <progression> - Chord progressions
• ${usedPrefix}ambient <mood> - Ambient sounds
• ${usedPrefix}binaural <frequency> - Binaural beats
• ${usedPrefix}whitenoise - White noise generator
• ${usedPrefix}pinknoise - Pink noise generator

🔍 *MUSIC RECOGNITION*
• ${usedPrefix}whatmusic <audio> - Identify music
• ${usedPrefix}shazam <audio> - Music recognition
• ${usedPrefix}lyrics <song> - Get song lyrics
• ${usedPrefix}artist <name> - Artist information
• ${usedPrefix}album <name> - Album information
• ${usedPrefix}genre <music> - Identify genre
• ${usedPrefix}bpm <audio> - Detect BPM
• ${usedPrefix}key <audio> - Detect musical key

🎪 *SOUND EFFECTS*
• ${usedPrefix}applause - Applause sound
• ${usedPrefix}drumroll - Drum roll effect
• ${usedPrefix}airhorn - Air horn sound
• ${usedPrefix}explosion - Explosion sound
• ${usedPrefix}laser - Laser sound effect
• ${usedPrefix}bell - Bell sound
• ${usedPrefix}whistle - Whistle sound
• ${usedPrefix}siren - Siren sound

🌧️ *NATURE SOUNDS*
• ${usedPrefix}rain - Rain sounds
• ${usedPrefix}thunder - Thunder sounds
• ${usedPrefix}ocean - Ocean waves
• ${usedPrefix}forest - Forest ambience
• ${usedPrefix}fire - Crackling fire
• ${usedPrefix}wind - Wind sounds
• ${usedPrefix}birds - Bird sounds
• ${usedPrefix}waterfall - Waterfall sounds

🎮 *GAMING AUDIO*
• ${usedPrefix}8bit <audio> - 8-bit conversion
• ${usedPrefix}chiptune <melody> - Chiptune music
• ${usedPrefix}retro <audio> - Retro game sounds
• ${usedPrefix}arcade <audio> - Arcade effects
• ${usedPrefix}powerup - Power-up sounds
• ${usedPrefix}gameover - Game over sound
• ${usedPrefix}victory - Victory fanfare
• ${usedPrefix}coin - Coin collection sound

🎭 *VOICE MODULATION*
• ${usedPrefix}male <audio> - Male voice
• ${usedPrefix}female <audio> - Female voice
• ${usedPrefix}child <audio> - Child voice
• ${usedPrefix}elderly <audio> - Elderly voice
• ${usedPrefix}alien <audio> - Alien voice
• ${usedPrefix}demon <audio> - Demon voice
• ${usedPrefix}chipmunk <audio> - Chipmunk voice
• ${usedPrefix}giant <audio> - Giant voice

🔄 *FORMAT CONVERSION*
• ${usedPrefix}tomp3 <audio> - Convert to MP3
• ${usedPrefix}towav <audio> - Convert to WAV
• ${usedPrefix}toflac <audio> - Convert to FLAC
• ${usedPrefix}toogg <audio> - Convert to OGG
• ${usedPrefix}tom4a <audio> - Convert to M4A
• ${usedPrefix}toacc <audio> - Convert to AAC
• ${usedPrefix}compress-audio <audio> - Compress audio
• ${usedPrefix}quality <audio> <bitrate> - Change quality

📊 *AUDIO ANALYSIS*
• ${usedPrefix}analyze-audio <audio> - Audio analysis
• ${usedPrefix}spectrum <audio> - Frequency spectrum
• ${usedPrefix}waveform <audio> - Generate waveform
• ${usedPrefix}duration <audio> - Get audio duration
• ${usedPrefix}volume <audio> - Check volume levels
• ${usedPrefix}silence <audio> - Detect silence
• ${usedPrefix}peak <audio> - Find peak levels
• ${usedPrefix}rms <audio> - RMS analysis

🎼 *MUSIC THEORY*
• ${usedPrefix}scale <key> - Musical scales
• ${usedPrefix}interval <notes> - Note intervals
• ${usedPrefix}transpose <audio> <semitones> - Transpose music
• ${usedPrefix}tuner - Audio tuner
• ${usedPrefix}metronome <bpm> - Metronome
• ${usedPrefix}chord-finder <notes> - Find chords
• ${usedPrefix}progression <chords> - Chord progressions
• ${usedPrefix}harmonize <melody> - Add harmony

🎵 *PLAYLIST TOOLS*
• ${usedPrefix}playlist <name> - Create playlist
• ${usedPrefix}shuffle <playlist> - Shuffle playlist
• ${usedPrefix}mix <songs> - Mix songs together
• ${usedPrefix}crossfade <songs> - Crossfade between songs
• ${usedPrefix}queue <songs> - Queue management
• ${usedPrefix}radio <genre> - Genre-based radio
• ${usedPrefix}recommendations <song> - Music recommendations

💡 *TIPS & INFORMATION:*
• Use high-quality audio files for better results
• Some effects work better with specific audio types
• Processing time depends on audio length and complexity
• Premium users get access to advanced effects
• Combine multiple effects for unique sounds
• Use headphones for better audio quality assessment`;

    // Send photo with caption for Telegram
    try {
      await bot.sendPhoto(m.chat, img, {
        caption: texto,
        parse_mode: 'Markdown'
      });
    } catch (error) {
      // Fallback to text message if image fails
      await bot.sendMessage(m.chat, texto, {
        parse_mode: 'Markdown'
      });
    }

  } catch (error) {
    console.error('Error in audio menu command:', error);
    await bot.sendMessage(m.chat, '❌ An error occurred while displaying the audio menu.');
  }
};

handler.help = ['audio', 'menuaudio', 'audiomenu', 'music'];
handler.tags = ['main'];
handler.command = ['audio', 'menuaudio', 'audiomenu', 'music', 'sound'];

export default handler; 