resource "aws_elastic_beanstalk_application" "my_app" {
  name        = "bustrack"
  description = "ccny bustrack"
}

resource "aws_elastic_beanstalk_environment" "env" {
  name                = "bustrack-env"
  application         = aws_elastic_beanstalk_application.my_app.name
  solution_stack_name = "64bit Amazon Linux 2 v5.2.3 running Node.js 12"

  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MinSize"
    value     = "1"
  }

  setting {
    namespace = "aws:autoscaling:asg"
    name      = "MaxSize"
    value     = "3"
  }
}
