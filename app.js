const yargs = require('yargs')

const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

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

var encodedAddress = geocode.geocodeAddress(argv.a)
var result = geocode.apiCall(encodedAddress, (errorMessage, results)=>{
  if(errorMessage){
    console.log(errorMessage)
  }else{
    console.log(results.address)
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults)=>{
        if(errorMessage){
          console.log(errorMessage)
        }else{
          // console.log(JSON.stringify(weatherResults, undefined, 2))
          console.log(`It is currently ${weatherResults.temperature}. \nIt feels like ${weatherResults.apparentTemperature}`)
        }
    })
  }
})
