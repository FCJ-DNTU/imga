#!/bin/bash

## Update packages
sudo yum update -y

## Install docker
sudo yum install -y docker

## Add user to docker
sudo usermod -d -G docker ec2-user

## Test authorization
docker ps