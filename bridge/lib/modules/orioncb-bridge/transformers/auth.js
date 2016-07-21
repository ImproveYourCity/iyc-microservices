var config = require('./../util/ArgParser').config;

module.exports.newAuth = function () {
    entity = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Fiware-Service": "sc_guadalajara",
            "Fiware-ServicePath": "/mtc"
        },
        data: {
            "auth": {
                "identity": {
                    "methods": [
                        "password"
                    ],
                    "password": {
                        "user": {
                            "domain": {
                                "name": config.auth_server.data.auth.identity.password.user.domain.name
                            },
                            "name": config.auth_server.data.auth.identity.password.user.name,
                            "password": config.auth_server.data.auth.identity.password.user.password
                        }
                    }
                },
                "scope": {
                    "project": {
                        "domain": {
                            "name": config.auth_server.data.auth.scope.project.domain.name
                        },
                        "name": config.auth_server.data.auth.scope.project.name
                    }
                }
            }
        }
    };

    return entity;
};