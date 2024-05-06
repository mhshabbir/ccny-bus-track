
cd dist

zip -r ../ccnybustracker.zip .

echo "Deployment package created: ccnybustracker.zip"

aws s3 cp "ccnybustracker.zip" s3://ccnybustacker

aws elasticbeanstalk create-application-version --application-name ccnybustracker --source-bundle S3Bucket="ccnybustracker",S3Key="ccnybustracker_deploy-$1.zip" --version-label "ver-$1" --description "file permissions" --region "us-east-1"

aws elasticbeanstalk update-environment --environment-name ccnybustracker-environment --version-label "ver-$1" --region "us-east-1"
