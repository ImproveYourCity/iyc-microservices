var Client = require('node-rest-client').Client;
var config = require('./../util/ArgParser').config;
var transformersAuth = require('./../transformers/auth');
var logger = require('./../../../util/Logger').logger;

client = new Client();

module.exports.authMiddleware = function (nextArgs, reply, callback) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    var auth = transformersAuth.newAuth();
    var baseUriAuth = config.auth_server.protocol + "://" + config.auth_server.hostname + ":" + config.auth_server.port;

    client.post(baseUriAuth + "/v3/auth/tokens", auth, function (authData, response) {
        var authHeader = response.headers["x-subject-token"];
        logger.info("Request to authentication server. URI: " + JSON.stringify(baseUriAuth));
        logger.info("Response from authentication server. HEADERS: " + JSON.stringify(response.headers));
        logger.info("Response from authentication server. BODY: " + JSON.stringify(authData));

        nextArgs.headers["X-Auth-Token"] = authHeader;

        callback(nextArgs, reply);
    })
        .on('error', function (err) {
            logger.error('Something went wrong on the request' + JSON.stringify(err.request.options));
        });
};