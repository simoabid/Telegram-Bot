import fetch from 'node-fetch'

const clima = {
  get url() {
    return {
      busqueda_geo: `https://cuaca.bmkg.go.id/api/df/v1/adm/search`,
      busqueda_geo_2: `https://www.gps-coordinates.net/geoproxy`,
      clima_actual: `https://weather.bmkg.go.id/api/presentwx/coord`,
      clima_alerta: `https://cuaca.bmkg.go.id/api/v1/public/weather/warning`
}
},

  get tokens() {
    return {
      gps: '9416bf2c8b1d4751be6a9a9e94ea85ca',
      bmkg: 'TOKEN_DE_AUTORIZACIÓN_DE_BMKG_AQUÍ'
}
},

  get encabezadosBase() {
    return {
      'accept-encoding': 'gzip, deflate, br, zstd'
}
},

  validarCoordenada(nombre, valor, min, max) {
    const num = parseFloat(valor)
    if (isNaN(num) || num < min || num> max) throw new Error(`Coordenada inválida: ${nombre}`)
},

  validarTexto(campo, valor) {
    if (typeof valor!== "string" ||!valor.trim().length)
      throw new Error(`El parámetro ${campo} debe ser texto y no puede estar vacío`)
},

  solicitarJson: async function (desc, url, opciones) {
    try {
      const res = await fetch(url, opciones)
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}\n${await res.text()}`)
      return await res.json()
} catch (err) {
      throw new Error(`Error obteniendo JSON: ${desc}\n${err.message}`)
}
},

  buscarCoordenadas: async function (lugar) {
    this.validarTexto('ubicación', lugar)
    const url = new URL('https://www.google.com/s')
    url.search = new URLSearchParams({ q: lugar, tbm: 'map'})

    const res = await fetch(url, { headers: this.encabezadosBase})
    if (!res.ok) throw new Error(`Error en Google Maps: ${res.statusText}`)

    const texto = await res.text()
    const datos = texto.split('\n')[1].trim()
    const resultado = eval(datos)
    const plano = [...new Set(resultado.flat(7).filter(v => v))]
    const coords = plano.filter(v => typeof v!== "string" &&!Number.isInteger(v))
    const textos = plano.filter(v => typeof v === "string")

    const latitud = coords[0]
    const longitud = coords[1]
    const lugarNombre = textos[1]?.split(", ")[0]

    if (!latitud ||!longitud) throw new Error(`No se encontraron coordenadas para "${lugar}"`)
    return { lugarNombre, latitud, longitud}
},

  obtenerClimaBMKG: async function (latitud, longitud, lugar = '') {
    try {
      this.validarCoordenada('latitud', latitud, -12, 7)
      this.validarCoordenada('longitud', longitud, 93, 142)
} catch (err) {
      throw new Error(`Coordenadas fuera de rango. ${err.message}`)
}

    const headerClima = this.encabezadosBase
    const urlClima = new URL(this.url.clima_actual)
    urlClima.search = new URLSearchParams({ lat: latitud, lon: longitud})

    const urlAdvertencia = new URL(this.url.clima_alerta)
    urlAdvertencia.search = new URLSearchParams({ lat: latitud, long: longitud})
    const headerAdvertencia = {
      'X-api-key': this.tokens.bmkg,
...this.encabezadosBase
}

    const [datosClima, datosAdvertencia] = await Promise.all([
      this.solicitarJson('clima', urlClima, { headers: headerClima}),
      this.solicitarJson('alerta', urlAdvertencia, { headers: headerAdvertencia})
    ])

    const { provinsi, kotkab, kecamatan, desa, adm4} = datosClima.data.lokasi
    const { weather_desc, weather_desc_en, local_datetime, t, hu, tcc, vs_text, vs, wd, wd_to, ws, wd_deg} = datosClima.data.cuaca

    const direcciones = { N: 'Norte', NE: 'Noreste', E: 'Este', SE: 'Sureste', S: 'Sur', SW: 'Suroeste', W: 'Oeste', NW: 'Noroeste'}
    const viento = `Viento desde ${direcciones[wd]} hacia ${direcciones[wd_to]}, velocidad ${ws} km/h, dirección ${wd_deg}°`

    const climaTexto = `🌍 *Ubicación:* ${desa}, ${kecamatan}, ${kotkab}, ${provinsi}
🕒 *Hora local:* ${local_datetime.split(" ")[1]}
⛅ *Clima:* ${weather_desc} / ${weather_desc_en}
🌡️ *Temperatura:* ${t}°C
💧 *Humedad:* ${hu}%
☁️ _Nubosidad:_ ${tcc}%
🌫️ _Visibilidad:_ ${vs_text} (${vs} m)
🌬️ _Viento:_ ${viento}`

    const impacto = datosAdvertencia.data?.today?.kategoridampak
    const advertencia = datosAdvertencia.data?.today?.description?.description?.trim() || 'Sin datos'
    const impactoTexto = impacto? JSON.parse(impacto.replaceAll("'", '"')).join(', '): 'Sin datos'

    const alertaTexto = `⚠️ *Impacto:* ${impactoTexto}
📢 _Advertencia:_ ${advertencia}`

    const enlaceBMKG = `🌐 *BMKG:* https://www.bmkg.go.id/cuaca/prakiraan-cuaca/${adm4}`
    const enlaceMapas = `🗺️ *Google Maps:* https://www.google.com/maps?q=${latitud},${longitud}`

    return `${lugar? `🏷️ *Lugar buscado:* ${lugar}\n\n`: ''}${climaTexto}\n\n${alertaTexto}\n\n${enlaceBMKG}\n${enlaceMapas}`
},

  ejecutar: async function (lugar) {
    const coords = await this.buscarCoordenadas(lugar)
    return await this.obtenerClimaBMKG(coords.latitud, coords.longitud, coords.lugarNombre)
}
}

let handler = async (m, { bot, args}) => {
  try {
    if (!args[0]) return m.reply('🧭 ¿Para qué lugar quieres consultar el clima?\nEjemplo: _.cuaca Caracas_ ')
    const lugar = args.join(' ')
    const resultado = await clima.ejecutar(lugar)
    await m.reply(resultado)
} catch (e) {
    await m.reply(`❌ Error: ${e.message}`)
}
}

handler.help = ['cuaca <lugar>']
handler.tags = ['herramientas']
handler.command = ['cuaca', 'weather']

export default handler