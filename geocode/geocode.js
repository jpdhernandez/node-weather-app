const request = require("request");

exports.geocodeAddress = (address, callback) => {
    const encodedAdrress = encodeURIComponent(address);

    request({
        url: `http://maps.googleapis.com/maps/api/geocode/json?address=${encodedAdrress}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback("Unable to connect to Google servers");
        } else if (body.status === "ZERO_RESULTS") {
            callback(`Unable to find "${address}" address`);
        } else if (body.status === "OK") {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
}