# Build React application
npm run build


zip -r "flaskbb_deploy-$1.zip" . -x "node_modules/*" -x "*.log"

aws s3 cp "flaskbb_deploy-$1.zip" s3://flaskbbapp

aws elasticbeanstalk create-application-version --application-name flaskbb --source-bundle S3Bucket="flaskbbapp",S3Key="flaskbb_deploy-$1.zip" --version-label "ver-$1" --description "Deploy package" --region "us-east-2"

aws elasticbeanstalk update-environment --environment-name flaskbb-environment --version-label "ver-$1" --region "us-east-2"
