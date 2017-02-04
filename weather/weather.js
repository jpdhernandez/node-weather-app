const request = require("request");
const secret = require("../secret/secret");

exports.getWeather = (latitude, longitude, callback) => {

    request({
        url: `https://api.darksky.net/forecast/${secret}/${latitude},${longitude}?units=si`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature,
                summary: body.currently.summary
            });
        } else {
            callback("Unable to fetch weather");
        }
    });
}