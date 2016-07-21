# IYC - vendor-ContextBroker Bridge

This project connects [IYC][1] with vendor's Context Broker through this micro-service based on the Hapi.JS framework. It is a Hapi.JS plugin [Hapi.JS plugins][2].

# Backoffice connection

## Requests

In the workflow editor, add to each node a "Notify to external server" configuration providing:

`POST` request to `http://<orion_bridge_url>:<orion_bridge_port>/append_request`. In `dev` environment, could be `http://orion_bridge:8026/append_request`.

In order to use this project with a local IYC environment, add links to this docker-compose in the `symfony` and `fpm` containers definition (docker-compose.yml)

~~~yml
external_links:
  - mtcorionbridge_bridge_1:orion_bridge
~~~

### Headers:

| Key          | Value            |
|--------------|------------------|
| Accept       | application/json |
| Content-Type | application/json |

### Body:

~~~json
{
    "service_request_id": "[[request.service_request_id]]",
	"token": "[[request.token]]",
	"service": "[[request.service_name]]",
	"description": "[[request.description]]",
	"jurisdiction": "[[request.jurisdiction]]",
	"updated_datetime": "[[request.updated_datetime]]",
	"status": "[[request.status]]",
	"priority": "[[request.priority]]",
	"position": "[[request.position]]",
	"scheduled_datetime": "[[metadata.scheduled_datetime]]"
}
~~~

* Replacing *<number>* with an integer value.
* "scheduled_datetime" should be present only if the service requires this parameter.

## Surveys
In the edit jurisdiction window, add in surveys URL: `http://<orion_bridge_url>:<orion_bridge_port>/append_answers`. In `dev` environment, could be `http://bridge:8026/append_answers`.

## Reports
In the edit jurisdiction window, add in reports URL: `http://<orion_bridge_url>:<orion_bridge_port>/append_report`. In `dev` environment, could be `http://bridge:8026/append_report`.

# Querying Context Broker

`POST` request to `http://<orion_url>:<orion_port>/v1/queryContext`

### Headers:

| Key          | Value            |
|--------------|------------------|
| Accept       | application/json |
| Content-Type | application/json |

## Requests

### Body:

~~~json
{
  "entities": [
      {
      "type": "SNIncidence",
      "isPattern": "true",
      "id": ".*"
      }
  ]
}
~~~

### Response

~~~json
{
  "contextResponses": [
    {
      "contextElement": {
        "type": "SNIncidence",
        "isPattern": "false",
        "id": "1142",
        "attributes": [
          {
            "name": "category",
            "type": "string",
            "value": "Aceras y calzadas"
          },
          {
            "name": "incidenceCode",
            "type": "string",
            "value": "55dc67f2946b8412008b4567"
          },
          {
            "name": "jurisdiction",
            "type": "string",
            "value": "55db46b19a6057610b8b468c"
          },
          {
            "name": "latitude",
            "type": "string",
            "value": "41.1250067"
          },
          {
            "name": "longitude",
            "type": "string",
            "value": "-4.2641197"
          },
          {
            "name": "priority",
            "type": "string",
            "value": "0"
          },
          {
            "name": "status",
            "type": "string",
            "value": "open"
          },
          {
            "name": "status_datetime",
            "type": "string",
            "value": "2015-08-25 13:05:13"
          },
          {
            "name": "subject",
            "type": "string",
            "value": "asdffdsa"
          }
        ]
      },
      "statusCode": {
        "code": "200",
        "reasonPhrase": "OK"
      }
    }
  ]
}
~~~

## Surveys

### Body:

~~~json
{
  "entities": [
      {
      "type": "PollResponse",
      "isPattern": "true",
      "id": ".*"
      }
  ]
}
~~~

### Response

~~~json
{
    "contextElements": [
        {
            "type": "PollResponse",
            "isPattern": "false",
            "id": "PollResponse_1",
            "attributes": [
            {
                "name": "responseCode",
                "type": "string",
                "value": "MTCP_001"
            },
            {
                "name": "response_datetime",
                "type": "string",
                "value": "YYYY-MM-DD HH:MM:SS"
            },
            {
                "name": "q1",
                "type": "numeric",
                "value": "7"
            },
            [...]
            {
                "name": "q22",
                "type": "numeric",
                "value": "6"
            }
            ]
        }
    ],
    "updateAction": "APPEND"
}
~~~

 [1]: http://www.mejoratuciudad.org
 [2]: https://medium.com/@davestevens84/manifests-plugins-and-schemas-organizing-your-hapi-application-68cf316730ef
