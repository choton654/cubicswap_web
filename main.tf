provider "google" {
  project     = "treazer-app-323918"
  region = "asia-south2"
  zone = "asia-south2-a"
  credentials = "./treazer-app-323918-f43cc36199d2.json"
}

resource "google_compute_instance" "default" {
    name = "new-treazer"
    machine_type = "e2-micro"
    boot_disk {
      initialize_params {
        image = "debian-cloud/debian-9"
      }
    }
     network_interface {
    network = "default"

    access_config {
      // Ephemeral public IP
    }
  }
}