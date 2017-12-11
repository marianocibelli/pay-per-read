#! /bin/bash
#Usage: start-up.sh env project version

ENV=$1
PROJECT_NAME=$2
APP_VERSION=$3

#Download zip with project version
aws s3 cp s3://exmc-application-deploys/$PROJECT_NAME/builds/$ENV/$APPLICATION_VERSION.zip /tmp/app.zip

#Unzip
tar -xvf /tmp/app.zip
docker build -t pay-per-read /tmp/app/
docker stop $(docker ps -q --filter ancestor=pay-per-read)
#Here we need to pass all the env variables needed, that includes APP_ENV, AWS permissions in case we are not deploying on a well configured IAM role instance (not our problem here) and CONTENTFUL.
#For security purpose i will manually configured them in the instance and pass them to the docker
docker run -e APP_ENV=prod -e CONTENTFUL_SPACE=$CONTENTFUL_SPACE -e CONTENTFUL_TOKEN=$CONTENTFUL_TOKEN -e TWITTER_ACCESS_TOKEN_KEY=$TWITTER_ACCESS_TOKEN_KEY -e TWITTER_ACCESS_TOKEN_SECRET=$TWITTER_ACCESS_TOKEN_SECRET -p 3001:3001 -d pay-per-read
