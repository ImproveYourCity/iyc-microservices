var transformers = require('./../transformers/surveyAnswers');
var httpAuthMiddleware = require('./../util/HttpRequestAuthServer');
var httpCallContextBroker = require('./../util/HttpRequestContextBroker');
var config = require('./../util/ArgParser').config;
var logger = require('./../../../util/Logger').logger;

module.exports.appendAnswersHandler = function (answers, reply) {
    var cba = transformers.newAnswers(answers.payload);

    if (config.contextbroker.has_auth) {
        logger.info("[SURVEY] Performing survey answers with authentication. Arguments:" + JSON.stringify(cba));
        httpAuthMiddleware.authMiddleware(cba, reply, httpCallContextBroker.sendPostRequest);
    } else {
        logger.info("[SURVEY] Performing survey answers without authentication. Arguments:" + JSON.stringify(cba));
        httpCallContextBroker.sendPostRequest(cba, reply);
    }
};
