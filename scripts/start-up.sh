#! /bin/bash
set -euo pipefail
#Usage: start-up.sh env project version

ENV=$1
PROJECT_NAME=$2
APP_VERSION=$3

#Download zip with project version
aws s3 cp s3://exmc-application-deploys/$PROJECT_NAME/builds/$ENV/$APPLICATION_VERSION.zip /tmp/app.zip

rm -rf /tmp/application
#Unzip
unzip -o /tmp/app.zip -d /tmp/application
docker build -t pay-per-read /tmp/application
for c in $(docker ps -q)
do
  docker stop $c
done
#Here we need to pass all the env variables needed, that includes APP_ENV, AWS permissions in case we are not deploying on a well configured IAM role instance (not our problem here) and CONTENTFUL.
#For security purpose i will manually configured them in the instance and pass them to the docker
docker run -e APP_ENV=prod -e AUTH0_CALLBACK="http://54.227.94.190:3001/callback" -p 3001:3001 -d pay-per-read
