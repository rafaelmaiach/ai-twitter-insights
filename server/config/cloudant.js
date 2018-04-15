(function () {
    "use strict";

    var cloudant = require("cloudant");
    var credentials = {};

    if (process.env.VCAP_SERVICES) {
        credentials = JSON.parse(process.env.VCAP_SERVICES).cloudantNoSQLDB[0].credentials;
    } else {
        credentials = {
            username: process.env.CLOUDANT_USER,
            password: process.env.CLOUDANT_PASS,
            host: process.env.CLOUDANT_HOST
        }
    }

    // Setup cloudant
    var cd = cloudant({
        hostname: credentials.host,
        account: credentials.username,
        password: credentials.password
    });


    module.exports = cd;

}());