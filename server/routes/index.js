(function () {
    "use strict";
    var nlu = require("../config/nlu");
    var cloudant = require("../config/cloudant");
    var request = require("request-promise");
    var dps = require('dbpedia-sparql-client').default;

    var uriTweetSearchApi = "https://1e69f488-7a92-456d-a58c-52639df20ae0-bluemix.cloudant.com/nlu-twitter-data/_design/tweets/_search/tweets?q=((*:*) AND NOT (content: RT))&limit=200";
    var FINAL_DATA_TWEETS, FINAL_DATA_NLU;
    var DATA_ERROR_TWEETS, DATA_ERROR_NLU;

    var getSparql = function (searchTerm) {
        return new Promise(function (resolve, reject) {
            var term = searchTerm.replace(/\s/g, "_");
            var query = 'prefix dbp: <http://dbpedia.org/resource/> prefix dbo: <http://dbpedia.org/ontology/> select ?abstract where { dbp:' + term + ' dbo:abstract ?abstract. filter(langMatches(lang(?abstract), "en"))}';

            dps.client()
                .query(query)
                .asJson()
                .then(function (result) {
                    resolve({
                        data: result["results"]["bindings"][0]["abstract"]["value"]
                    })
                })
                .catch(function (e) {
                    console.error("ERROR: " + e);
                    reject(e);
                })
        });
    }

    var getTweets = function () {
        return new Promise(function (resolve, reject) {
            request({
                method: 'GET',
                uri: uriTweetSearchApi,
                body: {},
                json: true
            }).then(function (data) {
                resolve({
                    bookmark: data.bookmark,
                    data: data.rows
                });
            }).catch(function (error) {
                reject(error);
            });
        });
    }

    var getNlu = function (id, tweetData) {
        return new Promise(function (resolve, reject) {
            var tweet_nlu = cloudant.db.use("nlu-twitter-data");
            tweet_nlu.get(id, function (err, data) {
                if (err) {
                    reject("error on get tweet cloudant: ", err);
                }
                else {
                    resolve(data.nlu);
                }
            });
        });
    }

    //create route
    module.exports = function (app, dependencies) {

        app.get("/getSparql", function (req, res) {
            if (req.query.filter) {
                getSparql(req.query.filter).then(function (response) {
                    res.send({
                        status: true,
                        dataSparql: response.data
                    });
                }).catch(function (error) {
                    res.send({
                        status: false,
                        message: error.message
                    });
                });
            }
            else {
                res.send({
                    status: false,
                    message: "Error on search term"
                })
            }

        });

        app.get("/getNluData", function (req, res) {
            getNlu(req.query.id, FINAL_DATA_TWEETS).then(function (data) {
                res.send({
                    status: true,
                    data: data
                })
            }).catch(function (error) {
                console.log("error getNlu: ", error.message);
                res.send({
                    status: false,
                    error: error.message
                })
            });
        });

        app.get("/getTweets", function (req, res) {
            getTweets().then(function (data) {
                FINAL_DATA_TWEETS = data;
                DATA_ERROR_TWEETS = false;
                res.send({
                    status: true,
                    data: FINAL_DATA_TWEETS.data
                });
            }).catch(function (error) {
                res.send({
                    status: false,
                    error: error.message
                });
            });
        });
    };
}());