provider "google" {
  project = "jcole654321"
  region  = "us-east4"
}

resource "google_container_cluster" "autopilot_cluster" {
  name     = "autopilot-cluster"
  location = "us-east4"

  enable_autopilot = true

  # No need to specify use_ip_aliases; it's handled by GKE Autopilot
}