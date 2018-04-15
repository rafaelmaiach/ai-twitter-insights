(function () {
    "use strict";

    var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
    var credentials = {};

    if (process.env.VCAP_SERVICES) {
        credentials = JSON.parse(process.env.VCAP_SERVICES)["natural-language-understanding"][0].credentials;
    } else
        credentials = {
            username: process.env.NLU_USER,
            password: process.env.NLU_PASS
        }

    var nlu = new NaturalLanguageUnderstandingV1({
        'username': credentials.username,
        'password': credentials.password,
        'version_date': '2017-02-27'
    });

    module.exports = nlu;

}());