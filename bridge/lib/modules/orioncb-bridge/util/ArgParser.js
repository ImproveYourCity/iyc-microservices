function getConfigFile() {
    var argv = require('yargs').argv;
    var configFile = null;

    switch (argv.vendor_env) {
        case "production":
            configFile = require('./../config/config-vendor');
            break;
        case "preproduction":
            configFile = require('./../config/config-vendor-preproduction');
            break;
        case "integration":
            configFile = require('./../config/config-vendor-integration');
            break;
        default:
            configFile = require('./../config/config-local');
    }

    return configFile;
}

var configFile = getConfigFile();

module.exports.config = configFile;