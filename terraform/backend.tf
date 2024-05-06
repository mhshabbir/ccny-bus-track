terraform {
  backend "s3" {
    bucket = "terraform-state-ccnybustracker-mshabbir76"
    key    = "core/terraform.tfstate"
    region = "us-east-1"
  }
}