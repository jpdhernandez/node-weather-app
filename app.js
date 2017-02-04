const request = require("request");

request({
    url: "http://maps.googleapis.com/maps/api/geocode/json?address=cn%20tower%20toronto",
    json: true
}, (error, response, body) => {
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Lat: ${body.results[0].geometry.location.lat}\n` +
        `Lng: ${body.results[0].geometry.location.lng}`
    );
});