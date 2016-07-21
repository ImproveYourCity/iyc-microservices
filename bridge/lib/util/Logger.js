var winston = require('winston');

//var fs = require('fs');
//var dir = '/var/log/microservices';
//
//if (!fs.existsSync(dir)){
//    fs.mkdirSync(dir);
//}

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            name: 'info-file',
            filename: '/var/log/microservices/context-broker-info.log',
            level: 'info'
        }),
        new (winston.transports.File)({
            name: 'error-file',
            filename: '/var/log/microservices/context-broker-error.log',
            level: 'error'
        })
    ]
});

module.exports.logger = logger;