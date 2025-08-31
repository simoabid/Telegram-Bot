let handler = async (m, { bot }) => {
  let chat = global.db.data.chats[m.chat]
  try {
    let text = m.text.toLowerCase();
    
    if (chat.audios){
    switch (text) {
        
        case 'bueno master':
            await bot.sendChatAction(m.chat, 'upload_voice');
            await bot.sendAudio(m.chat, 'https://cdn.russellxz.click/51d555db.mp3', {
                caption: `🎵 ${text}`,
                reply_to_message_id: m.id
            });
            break;

         case 'tralalero tralala':
            await bot.sendChatAction(m.chat, 'upload_voice');
            await bot.sendAudio(m.chat, 'https://cdn.russellxz.click/8d3290f3.mp3', {
                caption: `🎵 ${text}`,
                reply_to_message_id: m.id
            });
            break;

         case 'mudo':
            await bot.sendChatAction(m.chat, 'upload_voice');
            await bot.sendAudio(m.chat, 'https://cdn.russellxz.click/155f5cc4.mp3', {
                caption: `🎵 ${text}`,
                reply_to_message_id: m.id
            });
            break;

        case 'maldito teni':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/d9e48f07.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'chambear':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/fb415e7d.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'conoces a miguel':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/ygNqu.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'usted es feo':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/96fa6e44.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'como estan':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/OfgjC.opus', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'poco de gente':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://f.uguu.se/YxAfrAnj.opus', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'viva el sexo':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/1c2a4ccd.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'juicioso':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://f.uguu.se/QGdfsqyV.opus', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'lo paltimos':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://f.uguu.se/sxXCZcBQ.opus', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'tarado':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/CoOd.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'donde esta':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/kCWg.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'q onda':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/YpsR.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'bebesita':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/Ouwp.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'tka':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/jakw.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'takataka':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/rxvq.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'hey':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/AaBt.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'joder':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/lSgD.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'siuuu':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/05336e28.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'amongos':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/Mnrz.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'teamo':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/9321ffdc.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'estoy triste':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/b0d14bfc.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'un pato':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/pmOm.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'fiesta viernes':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/745f7caa.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'wtf':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/95894271.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'yokese':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/PWgf.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'vete a la vrg':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/98d99914.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'se pubrio':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/keKg.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'temazo':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/a8f5df5a.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case ':v':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/7fdd7ce1.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'freefire':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/Dwqp.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'es viernes':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/LcdD.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'feriado':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/mFCT.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'delibery':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/WGzN.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'aguanta':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/Qmz.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'moshi moshi':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/JAyd.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'nadie te pregunto':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/MrGg.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'feliz navidad':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/2d8778d7.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'niconico':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/YdVq.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'no chupala':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/iCRk.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'no me hables':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/xxtz.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'no me hagas usar esto':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/bzDa.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'no digas eso papus':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/jsb.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'noche de paz':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/8e6bd672.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'omg':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/PfuN.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'onichan':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/sEFj.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'orale':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/Epen.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'pasa pack':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/496776f1.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'contexto':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/YBzh.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'pero esto':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/javz.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'pikachu':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/wbAf.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'pokemon':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/kWLh.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'quien es tu botsito':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/uyqQ.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'rawr':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/YnoG.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'hablame':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/69fca661.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'cagaste':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/FAVP.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'yoshi':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/ZgKT.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'verdad que te engañe':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/yTid.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'vivan los novios':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/9e1167d5.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'yamete':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/284e70a5.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'usted está detenido':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/UWqX.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'una pregunta':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/NHOM.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'chiste':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/f87ff38f.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'gaspi y la minita':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/wYil.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'gaspi frase':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/gNwU.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'hermoso negro':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/ExSQ.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break; 

        case 'ara ara':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/dgBOr.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break; 

        case 'bienvenido wey':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/jykKi.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break; 

        case 'buen dia grupo':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/GoKq.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'calla fan de bts':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/oqNf.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'cambiate a movistar':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/RxJC.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'corte corte':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/hRuU.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'el toxico':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/WzBd.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'elmo sabe donde vives':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/YsLt.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'en caso de una investigación':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/Syg.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'FBI':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/wFbD.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'no estes tite':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/VrjA.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'eres fuerte':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/lhzq.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

         case 'zzzz':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/dff04354.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'las reglas del grupo':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/fwek.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'me anda buscando anonymous':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/MWJz.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'momento xds':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/PitP.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'motivacion':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/MXnK.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'muchachos escucharon':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/dRVb.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'nico nico':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/OUyB.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'no rompas mas':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/ZkAp.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'potasio':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/vPoj.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'que tal grupo':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/lirF.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'se estan riendo de mi':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/XBXo.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'su nivel de pendejo':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/SUHo.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'tal vez':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/QMjH.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'te gusta el pepino':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/ddrn.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'todo bien':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/EDUC.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'traiganle una falda':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/fnTL.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'y este quien es':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/QnET.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'goku pervertido':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/CUmZ.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'tengo los calzones':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/pzRp.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'a nadie le importa':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/JocM.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'mierda de bot':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/UEZQ.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'baneado':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/SJJt.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'basado':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/jDAl.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'bien pensado woody':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/nvxb.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'bañate':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/BoDxD.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'buenas noches':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/73fa91ab.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'bueno si':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/DqBM.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break; 

        case 'buenos dias':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/VZLGm.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'me olvide':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/VZLGm.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'diagnosticado con gay':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/GrCET.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'el pepe':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/b2490a7c.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'trap':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/Vved.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'enojado':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/jqTX.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'entrada':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/UpAC.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'esto va ser epico papus':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/8aa068ba.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'esto va para ti':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/Tabl.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'feliz cumpleaños':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/4b7ec36e.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'fiesta del admin 2':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/MpnG.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'fiesta del admin':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/jDVi.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'fiesta del admin 3':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/fRz.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'fino señores':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/hapR.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'me voy':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/iOky.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'tunometecabrasaramambiche':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/18e25020.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'gemidos':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/907939e4.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'audio hentai':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/f0689ae1.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'homero chino':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/ebe.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'hora de sexo':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/5ce5000a.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'jesucristo':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/AWdx.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'la oracion':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/GeeA.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'marica tu':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://cdn.russellxz.click/c057852c.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'ma ma masivo':
            bot.sendPresenceUpdate('recording', m.chat);
            await bot.sendDocument(m.chat, 'https://qu.ax/mNX.mp3', `${text}.mp3`, null, m, true, { type: 'audioMessage' });
            break;

        case 'oh me vengo':
            await bot.sendChatAction(m.chat, 'upload_voice');
            await bot.sendAudio(m.chat, 'https://qu.ax/waHR.mp3', {
                caption: `🎵 ${text}`,
                reply_to_message_id: m.id
            });
            break;

        case 'me pica los cocos':
            await bot.sendChatAction(m.chat, 'upload_voice');
            await bot.sendAudio(m.chat, 'https://qu.ax/UrNl.mp3', {
                caption: `🎵 ${text}`,
                reply_to_message_id: m.id
            });
            break;

        case 'mmmm':
            await bot.sendChatAction(m.chat, 'upload_voice');
            await bot.sendAudio(m.chat, 'https://cdn.russellxz.click/fed7f25c.mp3', {
                caption: `🎵 ${text}`,
                reply_to_message_id: m.id
            });
            break;
        
        default:
            
    }
    } else {
       
    }
    
  } catch (err) {
    console.error(err);
    m.reply('Ocurrió un error al enviar el audio.');
  }
};




handler.customPrefix = /^(Bueno master|maldito teni|conoces a miguel|usted es feo|como estan|viva el sexo|juicioso|lo paltimos|poco de gente|moshi moshi|nadie te pregunto|feliz navidad|niconico|no chupala|no me hables|no me hagas usar esto|no digas eso papus|noche de paz|omg|onichan|orale|pasa pack|contexto|pero esto|pikachu|pokemon|quien es tu botsito|rawr|hablame|cagaste|yoshi|verdad que te engañe|vivan los novios|yamete|usted esta detenido|una pregunta|chiste|gaspi y la minita|gaspi frase|se pubrio|temazo|:v|freefire|aguanta|es viernes|feriado|delibery|tarado|donde esta|q onda| bebesita|tka|takataka|hey|joder|siuuu|amongos|teamo|estoy triste|un pato|fiesta viernes|wtf|yokese|vete a la vrg|buenas noches|bueno si|buenos dias|me olvide|diagnosticado con gay|el pepe|trap|enojado|entrada|esto va ser epico papus|esto va para ti|feliz cumpleaños|fiesta de admin|fiesta de admin 2|fiesta de admin 3|fino señores|me voy|tunometecabrasaramambiche|gemidos|audio hentai|homero chino|hora de sexo|jesucristo|la oracion|marica tu|ma ma masivo|oh me vengo|me pica los cocos|mmmm|y este quien es|goku pervertido|tengo los calzones|a nadie le importa|mierda de bot|baneado|basado|bien pensado woody|bañate|tal vez|te gusta el pepino|todo bien|traiganle una falda|chambear|su nivel de pendejo|se estan riendo de mi|que tal grupo|potasio|nico nico|no rompas mas|muchachos escucharon|momento xds|motivacion|me anda buscando anonymous|eres fuerte|zzzz|las reglas del grupo|tralalero tralala|no estes tite|FBI|en caso de una investigación|elmo sabe donde vives|mudo|corte corte|el toxico|cambiate a movistar|hermoso negro|ara ara|bienvenido wey|in your area|buen dia grupo|calla fan de bts|)/i;
handler.command = new RegExp;

export default handler;

