#!/bin/bash

set -e

: "${environment:?variable not set or empty}"
: "${fullDeployment:?variable not set or empty}"

if [ "$CI" == "true" ]
then
  echo "Running on CI"
  export AZURE_CORE_OUTPUT=none
else
  echo "No CI"
fi

echo "Let's start"

#sandbox environment uses development parameters
case "$environment" in
 staging)
   paramFolder="staging"
   ;;
 prod)
   paramFolder="prod"
   ;;
 *)
   echo "unknown environment: $environment" >&2
   exit 1
esac

templates="infra/azure/apps/api/templates"
commonParams="$templates/params/common"
envParams="$templates/params/$paramFolder"

location="East US"
locationSymbol="eus"

prefix="jcomm-$environment-$locationSymbol"
rgp="$prefix-rgp"

echo "Creating resource group $rgp"
az group create --name "$rgp" --location "$location"

echo "Creating storage account"
az deployment group create \
  -n "$prefix-storage-account" \
  -g "$rgp" \
  -f "$templates"/storage.json \
  -p "$commonParams"/storage-account-parameters.json \
     "$envParams"/storage-account-parameters.json \
     prefix="$prefix" \
     environment="$environment" \
     locationSymbol="$locationSymbol" \
     location="$location"

echo "Creating service bus topics"
az deployment group create \
  -n "$prefix-sb-topics" \
  -g "$rgp" \
  -f "$templates"/svcbus-topics.json \
  -p "$commonParams"/svcbus-topics-parameters.json \
     "$envParams"/svcbus-topics-parameters.json \
     prefix="$prefix"

echo "Creating function app"
az deployment group create \
  -n "$prefix-fapp" \
  -g "$rgp" \
  -f "$templates"/funcapp.json \
  -p "$commonParams"/funcapp-parameters.json \
     "$envParams"/funcapp-parameters.json \
     prefix="$prefix" \
     location="$location" \
     fullDeployment="$fullDeployment"

echo "Finished creating function app"
