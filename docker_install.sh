#!/bin/bash

. utils.sh

## Update packages
infoln "Check package"
sudo yum update -y

## Install docker
infoln "Install docker"
sudo yum install -y docker

## Start docker daemon
infoln "Start docker daemon"
sudo service docker start
## Or
# sudo systemctl start docker

## Create docker group
infoln "Create docker group"
sudo groupadd docker

## Add user to docker
infoln "Add user to group"
sudo usermod -aG docker $USER

## Apply new change
newgrp docker

## Test authorization
docker ps