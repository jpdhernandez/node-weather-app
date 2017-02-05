const axios = require("axios");
const yargs = require("yargs");
const strftime = require("strftime");
const secret = require("./secret/secret");

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

const encodedAdrress = encodeURIComponent(argv.address);
const geocodeUrl = `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAdrress}`;

axios.get(geocodeUrl)
    .then((response) => {
        if (response.data.status === `ZERO_RESULTS`) {
            throw new Error("Unable to find the address");
        }

        const address = response.data.results[0].formatted_address;
        const latitude = response.data.results[0].geometry.location.lat;
        const longitude = response.data.results[0].geometry.location.lat;
        const weatherUrl = `https://api.darksky.net/forecast/${secret}/${latitude},${longitude}?units=si`;

        console.log(`Your current location is ${address}`);
        return axios.get(weatherUrl);
    })
    .then((response) => {
        const temperature = response.data.currently.temperature;
        const apparentTemperature = response.data.currently.apparentTemperature;
        const summary = response.data.currently.summary;
        const time = strftime("%R %P", new Date(Date.now()));

        console.log(
            `It's currently ${time} and the weather is ${summary}\n` +
            `The temperature is ${temperature} and it feels like ${apparentTemperature}`
        );
    })
    .catch((error) => {
        console.error(error.code === "ENOTFOUND" ? "Unable to conect to API servers" : error.message);
    });