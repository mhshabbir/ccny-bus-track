terraform {
  backend "s3" {
    bucket = "terraform-state-bustrack-quodfinis" 
    key    = "terraform.tfstate"
    region = "us-east-2"
  }
}