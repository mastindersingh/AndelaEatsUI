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

function addEnvFile() {
  ENV_FILE=$ROOT_DIRECTORY/.env
  warning "Adding .env file to Andela Easts root project directory"
  echo " "

  if [ ! -f "$ENV_FILE" ]; then
    cat <<EOF >>${ROOT_DIRECTORY}/.env
CLOUDINARY_CLOUD_NAME=${CLOUDINARY_CLOUD_NAME}
CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY}
CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET}
CLOUDINARY_URL=${CLOUDINARY_URL}
API_BASE_URL=${API_BASE_URL}
BASE_URL=${BASE_URL}
SENTRY_URL=${SENTRY_URL}
ANDELA_API_URL=${ANDELA_API_URL}
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
