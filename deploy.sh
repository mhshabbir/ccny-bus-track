# Build React application
npm run build

# Create a deployable zip file, excluding unnecessary files
zip -r "flaskbb_deploy-$1.zip" . -x "node_modules/*" -x "*.log"

# Upload the zip file to AWS S3
aws s3 cp "flaskbb_deploy-$1.zip" s3://flaskbbapp

# Create a new application version in Elastic Beanstalk
aws elasticbeanstalk create-application-version --application-name flaskbb --source-bundle S3Bucket="flaskbbapp",S3Key="flaskbb_deploy-$1.zip" --version-label "ver-$1" --description "Deploy package" --region "us-east-2"

# Update the Elastic Beanstalk environment to use new version
aws elasticbeanstalk update-environment --environment-name flaskbb-environment --version-label "ver-$1" --region "us-east-2"
