#! /bin/bash
set -euo pipefail
#Usage: deploy.sh environment project
#TODO: Dont DONT forget to implement a delete for old versions on s3, its cool to keep a few for rollback purposes (you could use the lambda from literally everywhere and get it easy)

PROJECT_NAME=$2
ENV=$1

cd /home/ubuntu/$PROJECT_NAME



if [[ "$ENV" == "prod" ]] ; then

	APPLICATION_VERSION=`node -e "console.log(require('./package.json').version);"`
	echo $APPLICATION_VERSION > APP_VERSION

	#Git
    git config user.email "circle@garbarino.com"
    git config user.name "circle"
    git add APP_VERSION
    git commit -m 'Version'
    git tag $APPLICATION_VERSION
    git push --tags
else
  #Generates a version unique name for dev. You can uncomment and generate a tag for each one but i think is way too much
	APPLICATION_VERSION=`node -e "console.log(require('./package.json').version + '-SNAPSHOT-$CIRCLE_SHA1-$CIRCLE_BUILD_NUM');"`
    #echo $APPLICATION_VERSION > APP_VERSION

    #Git
    #git config user.email "circle@garbarino.com"
    #git config user.name "circle"
    #git add APP_VERSION
    #git commit -m 'Version'
    #git tag $APPLICATION_VERSION
    #git push --tags
fi

echo $APPLICATION_VERSION

#Uploads version to s3 bucket
zip -r /tmp/app.zip  * -x node_modules\* -x build\*
aws s3 cp /tmp/app.zip s3://exmc-application-deploys/$PROJECT_NAME/builds/$ENV/$APPLICATION_VERSION.zip

# - Calls a lambda to trigger a deploy on the server this lambda should start up a new container
# - You can search old instance by a tag so its easy to identify and you dont have to set up ip on an environment variable like a did on this case
# - (you can create and use a new instance if you are worried about space,
# - test if the service got working and drain connections on load balance from old instance to new and after that delete de old instance / container)
# - Since im using a free aws account and to simplify this exercise I will go for something simple with ssh to the instance and an small downtime on deploy.
#aws lambda invoke  --invocation-type RequestResponse  --function-name trigger_function  --region us-east-1  --log-type Tail --payload '{"ENVIRONMENT":"'$ENV'","TAG":"'$APPLICATION_VERSION'","APP":"'$PROJECT_NAME'"}' outputfile.txt

# Beside this we could also use dockerhub for a better implementation instead of using s3 upload and github tag versioning (and if we go that way we should go all in into kubernetes but that requires like a lot of work)

#I will commit start-up.sh in the project too so its easier to check it out but its fairly simple.
ssh -t ec2-user@$INSTANCE_IP "sudo /opt/deploys/scripts/start-up.sh $ENV $PROJECT_NAME $APPLICATION_VERSION"
