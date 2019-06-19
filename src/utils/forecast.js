const request = require('request')


const forecast = (latitude, longitude, callback) => {
    let url = 'https://api.darksky.net/forecast/52494d3a742c0704c32f0ece5abcbe31/' + encodeURIComponent(longitude) +',' + encodeURIComponent(latitude)

    request({url, json : true}, (error, { body }) => {
    if(error) {
        callback("Sorry no dice")
    } else if (body.error)
    {
        callback("Yep, nope")
    }
    else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability +
             '% chance of rain. \nThe high for the day is: ' + body.daily.data[0].temperatureHigh + ' \nThe low for today is: ' + body.daily.data[0].temperatureLow)
        }
    
})
}
module.exports = forecast
 