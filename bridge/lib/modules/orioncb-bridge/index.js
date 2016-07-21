exports.register = function (server, options, next) {
    server.route({
        method: 'POST',
        path: '/append_request',
        handler: require('./handlers/request').appendRequestHandler,
        config: {
            description: 'Add Requests data in Context Broker'
        }
    });

    server.route({
        method: 'POST',
        path: '/append_answers',
        handler: require('./handlers/surveyAnswers').appendAnswersHandler,
        config: {
            description: 'Add survey answers data in Context Broker'
        }
    });

    server.route({
        method: 'POST',
        path: '/append_report',
        handler: require('./handlers/reportResponse').appendResponseHandler,
        config: {
            description: 'Add report response data in Context Broker'
        }
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};