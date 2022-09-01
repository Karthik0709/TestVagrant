const https = require('https');

async function getJson(url) {
    return new Promise((resolve, reject) => {
        https.get(url, function (response) {
            let body = "";
            response.on("data", (d) => {
                body += d;
            });
            response.on("end", () => {
                //console.log("response " + body);
                resolve(body);
            });
            response.on("error", (error) => {
                reject(error);
            });
        });
    });

}

module.exports = {
    getJson
}