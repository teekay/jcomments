#!/bin/bash

set -e

: "${environment:?variable not set or empty}"

echo "Get the storage connection string"
AZURE_STORAGE_CONNECTION_STRING=$(az storage account show-connection-string -g "jamcomments-${environment}-eus-rgp" -n "jc${environment}eusstgacc" --query "connectionString" -o tsv)

container=jamcomments-funcapp-releases
timestamp=$(date +"%Y%M%d%H%M%N")
blobName="functionapp${timestamp}.zip"

echo "Create storage container"
az storage container create -n "$container" --public-access off --connection-string "$AZURE_STORAGE_CONNECTION_STRING"

echo "Zip the app"
zip -q -r "$blobName" . -x@.funcignore -x .funcignore

echo "Upload ${blobName} to storage"
az storage blob upload -c "$container" -f "$blobName" -n "$blobName"  --connection-string "$AZURE_STORAGE_CONNECTION_STRING"

blobUrl=$(az storage blob url -c "$container" -n "$blobName" -o tsv --connection-string "$AZURE_STORAGE_CONNECTION_STRING")
expiry=$(date --date='5 years' +"%Y-%m-%dT%H:%M:%SZ")

echo "Get the SAS for the ZIP package"
sas=$(az storage blob generate-sas -c "$container" -n "$blobName" --permissions r -o tsv --expiry "$expiry" --connection-string "$AZURE_STORAGE_CONNECTION_STRING")

packageUrl="${blobUrl}?${sas}"

echo "Set the app settings to run from package URL"
az webapp config appsettings set -n "jamcomments-${environment}-eus-fapp" -g "jamcomments-${environment}-eus-rgp" --settings "WEBSITE_RUN_FROM_PACKAGE=$packageUrl"
