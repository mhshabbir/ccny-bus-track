zip -r "ccnybustracker-${{ github.sha }}.zip" ./*

aws s3 cp "ccnybustracker_deploy-${{ github.sha }}.zip" s3://terraform-state-ccnybustracker-mshabbir76

aws elasticbeanstalk create-application-version --application-name ccnybustracker --source-bundle S3Bucket="terraform-state-ccnybustracker-mshabbir76",S3Key="ccnybustracker-${{ github.sha }}.zip" --version-label "ver-$1" --description "file permissions" --region "us-east-1"

aws elasticbeanstalk update-environment --environment-name flaskbb-environment --version-label "ver-$1" --region "us-east-1"