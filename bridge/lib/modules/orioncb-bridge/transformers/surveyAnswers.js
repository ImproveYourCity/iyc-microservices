module.exports.newAnswers = function (payload) {
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
                    "type": "PollResponse",
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

    var datetime = payload.answered_datetime;
    datetime = datetime.replace("T", " ");
    datetime = datetime.substring(0, 19);

    entity.data.contextElements[0].attributes.push({
        "name": "response_datetime",
        "type": "string",
        "value": datetime
    });

    for (i=0; i<payload.question_answers.length; i++) {
        entity.data.contextElements[0].attributes.push({
            "name": payload.question_answers[i].question_code,
            "type": "numeric",
            "value": payload.question_answers[i].value
        });
    }

    return entity;
};