#! /bin/bash
set -euo pipefail
#Usage: start-up.sh env project version

ENV=$1
PROJECT_NAME=$2
APPLICATION_VERSION=$3

#Download zip with project version
aws s3 cp s3://exmc-application-deploys/$PROJECT_NAME/builds/$ENV/$APPLICATION_VERSION.zip /tmp/app.zip

rm -rf /tmp/application
#Unzip
unzip -o /tmp/app.zip -d /tmp/application
aws s3 cp s3://exmc-application-deploys/.env/.env.prod /tmp/application/.env.prod

docker build -t pay-per-read /tmp/application
for c in $(docker ps -q)
do
  docker stop $c
done

docker run -e APP_ENV=prod -e AUTH0_CALLBACK="http://54.227.94.190:3001/callback" -p 3001:3001 -d pay-per-read
