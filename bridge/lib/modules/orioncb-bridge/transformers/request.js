function getLatLong(positionStr) {
    positionStr = positionStr.replace(/\s+/g, ''); // remove spaces
    positionArr = positionStr.split(',');

    return {
        latitude: positionArr[0],
        longitude: positionArr[1]
    };
}

module.exports.newRequest = function (payload) {
    entity = {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Fiware-Service": "sc_guadalajara",
            "Fiware-ServicePath": "/mtc",
            "X-Auth-Token": ""
        },
        data: {
            "contextElements": [
                {
                    "type": "SNIncidence",
                    "isPattern": "false",
                    "id": payload.service_request_id,
                    "attributes": [
                        {
                            "name": "ID",
                            "type": "string",
                            "value": payload.service_request_id
                        },
                        {
                            "name": "incidenceCode",
                            "type": "string",
                            "value": payload.token
                        },
                        {
                            "name": "jurisdiction",
                            "type": "string",
                            "value": payload.jurisdiction
                        },
                        {
                            "name": "priority",
                            "type": "string",
                            "value": payload.priority
                        },
                        {
                            "name": "status",
                            "type": "string",
                            "value": payload.status
                        }
                    ]
                }
            ],
            "updateAction": "APPEND"
        }
    };

    var datetime = payload.updated_datetime;
    datetime = datetime.replace("T", " ");
    datetime = datetime.substring(0, 19);

    entity.data.contextElements[0].attributes.push({
        "name": "status_datetime",
        "type": "string",
        "value": datetime
    });

    if (payload.position) {
        position = getLatLong(payload.position);

        entity.data.contextElements[0].attributes.push({
            "name": "latitude",
            "type": "string",
            "value": position.latitude
        });

        entity.data.contextElements[0].attributes.push({
            "name": "longitude",
            "type": "string",
            "value": position.longitude
        });
    }

    if (payload.scheduled_datetime) {
        entity.data.contextElements[0].attributes.push({
            "name": "scheduled_datetime",
            "type": "string",
            "value": payload.scheduled_datetime
        });
    }

    if (payload.deferred) {
        entity.data.contextElements[0].attributes.push({
            "name": "deferred",
            "type": "string",
            "value": payload.deferred
        });
    }

    function encodeForbiddenCharacters(description) {
        description = description.replace(/</g, '%3C');
        description = description.replace(/>/g, '%3E');
        description = description.replace(/\"/g, '%22');
        description = description.replace(/'/g, '%27');
        description = description.replace(/=/g, '%3D');
        description = description.replace(/;/g, '%3B');
        description = description.replace(/\(/g, '%28');
        description = description.replace(/\)/g, '%29');
        return description;
    }

    entity.data.contextElements[0].attributes.push({
        "name": "subject",
        "type": "string",
        "value": encodeForbiddenCharacters(payload.description)
    });

    entity.data.contextElements[0].attributes.push({
        "name": "category",
        "type": "string",
        "value":  encodeForbiddenCharacters(payload.service)
    });

    return entity;
};