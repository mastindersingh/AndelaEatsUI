#!/usr/bin/env bash
set -eo pipefail

DEPLOY_SCRIPT_PATH="${HOME}/deploy"

curl -o $DEPLOY_SCRIPT_PATH https://raw.githubusercontent.com/AndelaOSP/bash-helper-modules/master/k8s/deploy

source $DEPLOY_SCRIPT_PATH

DOCKER_REGISTRY=gcr.io
GCLOUD_SERVICE_KEY_NAME=gcloud-service-key.json
ALLOWED_DEPLOY_ENVIRONMENTS=('staging', 'production')

PROJECT_NAME=feed-frontend
DOCKER_REGISTRY=gcr.io


require 'PRODUCTION_GOOGLE_COMPUTE_ZONE' $PRODUCTION_GOOGLE_COMPUTE_ZONE
require 'STAGING_GOOGLE_COMPUTE_ZONE' $STAGING_GOOGLE_COMPUTE_ZONE
require 'STAGING_CLUSTER_NAME' $STAGING_CLUSTER_NAME
require 'PRODUCTION_CLUSTER_NAME' $PRODUCTION_CLUSTER_NAME
require 'PROJECT_NAME' $PROJECT_NAME
require 'GOOGLE_PROJECT_ID' $GOOGLE_PROJECT_ID
require 'DOCKER_REGISTRY' $DOCKER_REGISTRY
require 'GCLOUD_SERVICE_KEY' $GCLOUD_SERVICE_KEY

BRANCH_NAME=$CIRCLE_BRANCH
# set the deployment environment.
setEnvironment $BRANCH_NAME

export NODE_ENV=$ENVIRONMENT

# ensure its an allowed deployment environment
isAllowedDeployEnvironment $ENVIRONMENT
# get K8s deployment name

getDeploymentName DEPLOYMENT_NAME

# Set image image tag and name
IMAGE_TAG=$(getImageTag $(getCommitHash))
IMAGE_NAME=$(getImageName)

buildApplicationArtifacts() {
    cd client
    npm run build:production 
    cd $OLDPWD
}

main() {
    buildApplicationArtifacts
    installGoogleCloudSdk
    authWithServiceAccount
    configureGoogleCloudSdk
    loginToContainerRegistry _json_key
    buildAndTagDockerImage -f docker/Dockerfile .
    publishDockerImage
    logoutContainerRegistry $DOCKER_REGISTRY
    deployToKubernetesCluster frontend
}

main