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

templates="infra/azure/apps/admin/templates"
commonParams="$templates/params/common"
envParams="$templates/params/$paramFolder"

location="East US"
locationSymbol="eus"

prefix="jcomm-$environment-$locationSymbol"
rgp="$prefix-rgp"

echo "Creating resource group $rgp"
az group create --name "$rgp" --location "$location"

echo "Creating web app (dashboard)"
az deployment group create \
  -n "$prefix-webapp" \
  -g "$rgp" \
  -f "$templates"/webapp-dashboard.json \
  -p "$commonParams"/webapp-dashboard-parameters.json \
     "$envParams"/webapp-dashboard-parameters.json \
     prefix="$prefix" \
     location="$location" \
     fullDeployment="$fullDeployment"

echo "Finished creating web app"
