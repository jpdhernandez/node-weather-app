const request = require("request");

request({
    url: "http://maps.googleapis.com/maps/api/geocode/json?address=cn%20tower%20toronto",
    json: true
}, (error, response, body) => {
    console.log(JSON.stringify(body, undefined, 2));
});