var Client = require('node-rest-client').Client;
var config = require('./../util/ArgParser').config;
var logger = require('./../../../util/Logger').logger;

client = new Client();

module.exports.sendPostRequest = function (cba, reply) {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    var baseUri = config.contextbroker.protocol + "://" + config.contextbroker.hostname + ":" + config.contextbroker.port;

    client.post(baseUri + "/v1/updateContext", cba, function (data, response) {
        logger.info("Request to Context Broker. URI: " + JSON.stringify(baseUri));
        logger.info("Response from Context Broker. HEADERS: " + JSON.stringify(response.headers));
        logger.info("Response from Context Broker. BODY: " + JSON.stringify(data));

        reply(JSON.stringify(data));
    })
        .on('error', function (err) {
            logger.error('Something went wrong on the request', JSON.stringify(err.request.options));
        });
};