#!/bin/bash

## Update packages
sudo yum update -y

## Install docker
sudo yum install -y docker

## Start docker daemon
sudo usermod -a -G docker ec2-user
## Or
# sudo systemctl start docker

## Add user to docker
sudo usermod -d -G docker ec2-user

## Test authorization
docker ps