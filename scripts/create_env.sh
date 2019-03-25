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

read -r -d '' BASE_CONFIG <<- EOM
    CLOUDINARY_CLOUD_NAME=${CLOUDINARY_CLOUD_NAME}
    CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY}
    CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET}
    CLOUDINARY_URL=${CLOUDINARY_URL}
    SENTRY_URL=${SENTRY_URL}
EOM

read -r -d '' PRODUCTION_CONFIG <<- EOM
    API_BASE_URL=${API_BASE_URL}
    BASE_URL=${BASE_URL}
    ANDELA_API_URL=${ANDELA_API_URL}
EOM

read -r -d '' STAGING_CONFIG <<- EOM
    API_BASE_URL=${STAGING_API_BASE_URL}
    BASE_URL=${STAGING_BASE_URL}
    ANDELA_API_URL=${STAGING_ANDELA_API_URL}
EOM


function addEnvFile() {
  ENV_FILE=$ROOT_DIRECTORY/client/.env
  warning "Adding .env file to Andela Easts root project directory"
  echo " "

  [[ $CIRCLE_BRANCH == "master" ]] &&
   $BASE_CONFIG += $PRODUCTION_CONFIG 
   || $BASE_CONFIG += $STAGING_CONFIG

  if [ ! -f "$ENV_FILE" ]; then
    cat <<EOF >>${ROOT_DIRECTORY}/client/.env
    ${BASE_CONFIG}
EOF
    success "lsEnvironment file has been created successfully"
    return
  fi

  warning "Skipping, Environment file already exist"
  reset
}
 
main () {
  addEnvFile
}
main
