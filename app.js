const request = require("request");
const yargs = require("yargs");

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

const address = encodeURIComponent(argv.address);

request({
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
    json: true
}, (error, response, body) => {
    if (error) {
        return console.error("Unable to connect to Google servers");
    } else if (body.status === "ZERO_RESULTS") {
        return console.error(`Unable to find "${address}" address`);
    } else if (body.status === "OK") {
        console.log(`Address: ${body.results[0].formatted_address}`);
        console.log(
            `Lat: ${body.results[0].geometry.location.lat}\n` +
            `Lng: ${body.results[0].geometry.location.lng}`
        );
    }
});