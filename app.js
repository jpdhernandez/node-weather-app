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

const address = encodeURIComponent(argv[1]);

request({
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
    json: true
}, (error, response, body) => {
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(
        `Lat: ${body.results[0].geometry.location.lat}\n` +
        `Lng: ${body.results[0].geometry.location.lng}`
    );
});