var logger = require('./lib/util/Logger').logger;
var argv = require('yargs').argv;

logger.info("Running on environment [vendor]: " + argv.vendor_env);

var configTel = require('./lib/modules/orioncb-bridge/util/ArgParser').config;
logger.info("Configuration [vendor]: " + JSON.stringify(configTel));

var Glue = require('glue');
var manifest = require('./config/manifest.json');

var options = {
    relativeTo: __dirname + '/lib/modules'
};

Glue.compose(manifest, options, function (err, server) {
    if (err) throw err;

    server.start(function (err) {
        logger.info('Server running at:' + server.info.uri);
    });
});
