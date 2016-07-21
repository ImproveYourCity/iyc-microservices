# IYC - Bridges

This project connects third-party services with [IYC][1] using micro-services based on the Hapi.JS framework.

Please try to use a modular approach developing [Hapi.JS plugins][2] for each micro-service.

Currently available microservices are:

- IYC-OrionContextBroker Bridge (SmartGuadalajara - Telefonica)

- IYC-OrionContextBroker-IYC_Dashboard Bridge (SmartGuadalajara - Telefonica)

This project provides a `bridge` folder with the Hapi.JS project and a little docker-compose file to test microservices locally.

#### How to create a new plugin for the 'bridge' microservice
Following the modular aproach:

1. Create a new folder under the /bridge/modules directory and index.js inside it
2. Add the name of your plugin to the manifest.json located at /bridge/config such as:
```javascript
"plugins": {
    "./vendor-indicators-orioncb-bridge": null,
    "./vendor-widgets-orioncb-bridge": null
  }
```
3. Create package.json inside the new folder which will contain information about the new plugin
It should contain the following info:
```javascript
{
  "name": "nameOfThePlugin",
  "version": "1.0.0",
  "private": true,
  "description": "Describe what the plugin does HERE"
}
```
The 'private' field can be substituted for a 'repository' field if the code is allocated in one as the following example:
```javascript
{
  "name": "nameOfThePlugin",
  "version": "1.0.0",
  "description": "Describe what the plugin does HERE"
}
```
4. Compliment the code with a README.md
5. Try to follow the [structure suggested][2] while implementing your code

 [1]: http://www.mejoratuciudad.org
 [2]: https://medium.com/@davestevens84/manifests-plugins-and-schemas-organizing-your-hapi-application-68cf316730ef
