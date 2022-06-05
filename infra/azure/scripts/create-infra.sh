#!/bin/bash

set -e

: "${environment:?variable not set or empty}"

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

templates="infra/azure/templates"
commonParams="$templates/params/common"
envParams="$templates/params/$paramFolder"

prefix="jamcomments-$environment-$locationSymbol"
rgp="$prefix-rgp"

echo "Resource Group Name $rgp"
az group create --name "$rgp" --location "$location"


echo "Creating key vault"
az deployment group create \
  -g "$rgp" \
  -f "$templates"/keyvault.json \
  -p "$commonParams"/kv-parameters.json \
     "$envParams"/kv-parameters.json \
     prefix="$prefix" \
     location="$location"

echo "Creating servicebus namespace"
az deployment group create \
  -g "$rgp" \
  -f "$templates"/svcbus.json \
  -p "$commonParams"/svcbus-parameters.json \
     "$envParams"/svcbus-parameters.json \
     prefix="$prefix" \
     location="$location"
