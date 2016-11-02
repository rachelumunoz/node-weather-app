const yargs = require('yargs')
const axios = require('axios')

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv

var encodedAddress = encodeURIComponent(argv.a)

var geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`

axios.get(geocodeUrl).then((response)=>{
  if(response.data.status === "ZERO_RESULTS"){
    throw new Error('Unable to find that address')
  }

  var lat = response.data.results[0].geometry.location.lat
  var lng = response.data.results[0].geometry.location.lng
  var weatherUrl = `https://api.darksky.net/forecast/c16b55bfdaf95e268163eae7791883a5/${lat},${lng}`
  console.log(response.data.results[0].formatted_address)
  return axios.get(weatherUrl)
}).then((response)=>{
  var temp = response.data.currently.temperature
  var apparentTemperature = response.data.currently.apparentTemperature
  console.log(`It's currently ${temp}. It feels like ${apparentTemperature}`)
}).catch((e)=>{
  if (e.code === 'ECONNREFUSED'){
    console.log('unable to connect to api server')
  }else{
    console.log(e.message)
  }
})

