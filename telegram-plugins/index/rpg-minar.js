const cooldowns = {}

let handler = async (m, { bot }) => {

  let amount = Math.floor(Math.random() * 20)
  const tiempoEspera = 5 * 60 // 5 minutos
  if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempoEspera * 1000) {
    const tiempoRestante = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempoEspera * 1000 - Date.now()) / 1000))
    m.reply(`🕜 Espera *${tiempoRestante}* para volver a Minar.`)
    return
  }

  global.db.data.users[m.sender].limit += amount
  await m.reply(`Genial! minaste *${amount} 🍬 Dulces*`)
  cooldowns[m.sender] = Date.now()
}
handler.help = ['minar']
handler.tags = ['rpg']
handler.command = ['minar', 'miming', 'mine'] 
handler.register = false
export default handler