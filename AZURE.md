# Running JamComments on the Azure cloud

The admin app can run as a Web app on the App Service PaaS. If you are operating it yourself for your web properties, you can turn it on and off as you need it (or don't).

The comments API can run on Azure Functions. The Consumption tier is totally fine for self-hosting scenarios. The cold start is a reality, so the first request is going to take a few seconds to complete.

## ZIP deploy

Deploy function app:

```sh
yarn build
zip -r functionapp.zip . -x@.funcignore -x .funcignore
az functionapp deployment source config-zip -g ${MY_RESOURCE_GROUP} -n ${MY_APP_NAME} --src functionapp.zip
```

Deploy admin app to App Service and make it run from package:

```sh
 zip -r appservice.zip . -x@.appserviceignore -x .funcignore
az webapp deployment source config-zip --resource-group <group-name> --name <app-name> --src <filename>.zip
```
