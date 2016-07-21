var transformers = require('./../transformers/reportResponse');
var httpAuthMiddleware = require('./../util/HttpRequestAuthServer');
var httpCallContextBroker = require('./../util/HttpRequestContextBroker');
var config = require('./../util/ArgParser').config;
var logger = require('./../../../util/Logger').logger;

module.exports.appendResponseHandler = function (answers, reply) {
    var cba = transformers.newReportResponse(answers.payload);

    if (config.contextbroker.has_auth) {
        logger.info("[REPORT] Performing report response with authentication. Arguments:" + JSON.stringify(cba));
        httpAuthMiddleware.authMiddleware(cba, reply, httpCallContextBroker.sendPostRequest);
    } else {
        logger.info("[REPORT] Performing report response without authentication. Arguments:" + JSON.stringify(cba));
        httpCallContextBroker.sendPostRequest(cba, reply);
    }
};
