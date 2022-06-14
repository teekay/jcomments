#!/bin/bash

set -e

: "${environment:?environment not set or empty}"
: "${mailgunApiKey:?mailgunApiKey not set or empty}"
: "${mailgunDomain:?mailgunDomain not set or empty}"
: "${mailgunSender:?mailgunSender not set or empty}"

if [ "$CI" == "true" ]
then
  echo "Running on CI"
  export AZURE_CORE_OUTPUT=none
else
  echo "Not running on CI"
fi

echo "Let's start"

location="East US"
locationSymbol="eus"

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

templates="infra/azure/platform/templates"
commonParams="$templates/params/common"
envParams="$templates/params/$paramFolder"

prefix="jcomm-$environment-$locationSymbol"
rgp="$prefix-rgp"

echo "Creating resource group $rgp"
az group create --name "$rgp" --location "$location"

echo "Creating key vault"
az deployment group create \
  -g "$rgp" \
  -f "$templates"/keyvault.json \
  -p "$commonParams"/kv-parameters.json \
     "$envParams"/kv-parameters.json \
     prefix="$prefix" \
     location="$location" \
     mailgunSender="$mailgunSender" \
     mailgunDomain="$mailgunDomain" \
     mailgunApiKey="$mailgunApiKey"

echo "Creating servicebus namespace"
az deployment group create \
  -g "$rgp" \
  -f "$templates"/svcbus.json \
  -p "$commonParams"/svcbus-parameters.json \
     "$envParams"/svcbus-parameters.json \
     prefix="$prefix" \
     location="$location"

echo "Creating application insights"
az deployment group create \
  -g "$rgp" \
  -f "$templates"/ain.json \
  -p "$commonParams"/ain-parameters.json \
     "$envParams"/ain-parameters.json \
     prefix="$prefix" \
     location="$location"

echo "Creating Postgres database"
az deployment group create \
  -g "$rgp" \
  -f "$templates"/postgres.json \
  -p "$commonParams"/pg-parameters.json \
     "$envParams"/pg-parameters.json \
     prefix="$prefix" \
     location="$location" \
     administratorLoginPassword="$DB_PASSWORD"
