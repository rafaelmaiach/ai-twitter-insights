var express = require('express');

var cfenv = require('cfenv');

var app = express();
require('dotenv').config();

app.use(express.static(__dirname + '/client'));

var appEnv = cfenv.getAppEnv();

require("./server/routes/index")(app, {});

app.listen(appEnv.port, '0.0.0.0', function() {
  console.log("server starting on " + appEnv.url);
});
