const yargs = require("yargs");
const strftime = require("strftime");
const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: "address",
            describe: "Address to fetch weather for",
            string: true
        }
    })
    .help()
    .alias("help", "h")
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage, addressResults) => {
    if (errorMessage) {
        return console.error(errorMessage)
    } else {
        console.log(`Your current location is ${addressResults.address}`);
    }

    weather.getWeather(addressResults.latitude, addressResults.longitude, (errorMessage, weatherResults) => {
        if (errorMessage) {
            return console.error(errorMessage)
        } else {
            const time = strftime("%R %P", new Date(Date.now()));
            console.log(
                `It's currently ${time} and the weather is ${weatherResults.summary}\n` +
                `The temperature is ${weatherResults.temperature} and it feels like ${weatherResults.apparentTemperature}`
            );
        };
    });
});