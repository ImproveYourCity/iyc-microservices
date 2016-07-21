module.exports.newReportResponse = function (payload) {
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
                    "type": "ReportResponse",
                    "isPattern": "false",
                    "id": payload.request.service_request_id,
                    "attributes": [
                        {
                            "name": "responseCode",
                            "type": "string",
                            "value": payload.request.service_request_id
                        }
                    ]
                }
            ],
            "updateAction": "APPEND"
        }
    };


    var datetime = payload.finished_at;
    datetime = datetime.replace("T", " ");
    datetime = datetime.substring(0, 19);

    entity.data.contextElements[0].attributes.push({
        "name": "response_datetime",
        "type": "string",
        "value": datetime
    });

    for (i=0; i<payload.answers.length; i++) {
        entity.data.contextElements[0].attributes.push({
            "name": payload.answers[i].key,
            "type": "string",
            "value": payload.answers[i].value_string
        });
    }

    return entity;
};
