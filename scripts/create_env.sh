#!/usr/bin/env bash
set -eo pipefail

#!/bin/bash
if [ -e $1 ]; then
  echo "File $1 already exists!"
  echo "Removing and  creating a new file"
  rm ../.env
else
  echo >> $1
fi


echo "CLOUDINARY_CLOUD_NAME=$CLOUDINARY_CLOUD_NAME" >> ../.env
echo "CLOUDINARY_API_KEY=$CLOUDINARY_API_KEY" >> ../.env
echo "CLOUDINARY_API_SECRET=$CLOUDINARY_API_SECRET" >> ../.env
echo "CLOUDINARY_URL=$CLOUDINARY_URL" >> ../.env
echo "API_BASE_URL=$API_BASE_URL" >> ../.env
echo "BASE_URL=$BASE_URL" >> ../.env
echo "SENTRY_URL=$SENTRY_URL" >> ../.env
echo "ANDELA_API_URL=$ANDELA_API_URL" >> ../.env