# Running JamComments in the Azure cloud

The admin app can run as a Web app on the App Service PaaS. If you are operating it yourself for your web properties, you can turn it on and off as you need it (or don't).

The comments API can run on Azure Functions. The Consumption tier is totally fine for self-hosting scenarios. The cold start is a reality, so the first request is going to take a few seconds to complete.

The `infra/azure` folder has a complete set of templates and scripts for deployment to Azure. Together with Github pipelines, you can have a completely automatic CI/CD pipeline. I wrote a [tutorial](https://tomaskohl.com/code/2022/automated-deployment-linux-azure-functions-app/) that you can follow along.

Bear in mind that as of late June, 2022, you should deploy the Function app before you deploy the admin dashboard. If you were to deploy the dashboard first, Azure wouldn't let you create the function for some reason (error code: `LinuxDynamicWorkersNotAllowedInResourceGroup`). This limitation may be lifted in the future, and does not apply to repeated incremental code deployments but only when the app are created for the first time.
