var transformers = require('./../transformers/request');
var httpAuthMiddleware = require('./../util/HttpRequestAuthServer');
var httpCallContextBroker = require('./../util/HttpRequestContextBroker');
var config = require('./../util/ArgParser').config;
var logger = require('./../../../util/Logger').logger;

module.exports.appendRequestHandler = function (request, reply) {
    var cba = transformers.newRequest(request.payload);

    if (config.contextbroker.has_auth) {
        logger.info("[REQUEST] Performing request with authentication. Arguments:" + JSON.stringify(cba));
        httpAuthMiddleware.authMiddleware(cba, reply, httpCallContextBroker.sendPostRequest);
    } else {
        logger.info("[REQUEST] Performing request without authentication. Arguments:" + JSON.stringify(cba));
        httpCallContextBroker.sendPostRequest(cba, reply);
    }
};