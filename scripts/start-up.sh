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
docker run -e AUTH0_CALLBACK=$AUTH0_CALLBACK -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY -e APP_ENV=prod -e CONTENTFUL_SPACE=$CONTENTFUL_SPACE -e CONTENTFUL_TOKEN=$CONTENTFUL_TOKEN -e TWITTER_ACCESS_TOKEN_KEY=$TWITTER_ACCESS_TOKEN_KEY -e TWITTER_ACCESS_TOKEN_SECRET=$TWITTER_ACCESS_TOKEN_SECRET -p 3001:3001 -d pay-per-read
