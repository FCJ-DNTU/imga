#!/bin/bash

## Update packages
sudo yum update -y

## Install docker
sudo yum install -y docker

## Start docker daemon
sudo service docker start
## Or
# sudo systemctl start docker

## Create docker group
sudo groupadd docker

## Add user to docker
sudo usermod -aG docker $USER

## Apply new change
newgrp docker

## Test authorization
docker ps