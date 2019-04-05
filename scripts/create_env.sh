#!/usr/bin/env bash

set -o errexit
set -o pipefail

DIRECTORY="$(cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd)"
 
ROOT_DIRECTORY=$(dirname $DIRECTORY)
export TERM=xterm-256color

# colors
red=$(tput setaf 1)
green=$(tput setaf 76)
tan=$(tput setaf 3) 
white=$(tput setaf 7)

success() {
  printf "${green}===> %s${reset}\n" "$@"
}

error() {
  printf "${red}===> %s${reset}\n" "$@"
}

warning() {
  printf "${tan}===> %s${reset}\n" "$@"
}

reset() {
  printf "${white}"
}

BASE_CONFIG=("
    CLOUDINARY_CLOUD_NAME=${CLOUDINARY_CLOUD_NAME}\n
    CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY}\n
    CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET}\n
    CLOUDINARY_URL=${CLOUDINARY_URL}\n
    SENTRY_URL=${SENTRY_URL}\n"
)

PRODUCTION_CONFIG=("
    API_BASE_URL=${API_BASE_URL}\n
    BASE_URL=${BASE_URL}\n
    ANDELA_API_URL=${ANDELA_API_URL}\n"
)

STAGING_CONFIG=("
    API_BASE_URL=${STAGING_API_BASE_URL}\n
    BASE_URL=${STAGING_BASE_URL}\n
    ANDELA_API_URL=${STAGING_ANDELA_API_URL}\n"
)

function addEnvFile() {
  ENV_FILE=$ROOT_DIRECTORY/client/.env
  warning "Adding .env file to Andela Easts root project directory"
  echo ">>>>>>>>>>>>>>>>>"

  [[ "${CIRCLE_BRANCH}" == "master" ]] && BASE_CONFIG+=$PRODUCTION_CONFIG || BASE_CONFIG+=$STAGING_CONFIG

  echo $CIRCLE_BRANCH
  echo $BASE_CONFIG
  echo "<<<<<<<<<<<<<<<<"

  if [ ! -f "$ENV_FILE" ]; then
    echo -e $BASE_CONFIG >> ${ROOT_DIRECTORY}/client/.env
    success "Environment file has been created successfully"
    return
  fi

  warning "Skipping, Environment file already exist"
  reset
}

main () {
  addEnvFile
}
main
