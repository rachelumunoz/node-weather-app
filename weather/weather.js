const request = require('request')

var getWeather = (lat, lng, callback) =>{
  request({
    url: `https://api.darksky.net/forecast/c16b55bfdaf95e268163eae7791883a5/${lat},${lng}`,
    json: true
  }, (err, res, body)=>{
    if (err){
      callback('Unable to connect')
    }else if (res.statusCode === 404 ){
      callback('Unable to fetch weather')
    }else if ( res.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      })
    }
  })
}

module.exports = {
  getWeather
}

//c16b55bfdaf95e268163eae7791883a5