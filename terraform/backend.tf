terraform {
  backend "s3" {
    bucket = "terraform-state-ccnybustrack-jaytrivedi2002" 
    key    = "core/terraform.tfstate"
    region = "us-east-2"
  }
}