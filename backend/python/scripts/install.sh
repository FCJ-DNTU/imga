#!/bin/bash

## Update packages
apt update

## Install util packages
apt install wget

## Install python and pip
### Install python3
apt install python3
printf "Python has been just installed: $(python3 --version)"

### Install pip3
apt install python3-pip
printf "PIP has just been installed: $(node -v)"

# Change directory to `/home/backend/python`
cd /home/backend/python

## Install virtualenv and create virtual environment
pip3 install virtualenv
virtualenv venv
source venv/bin/activate

## Install packages in `requirements.txt`
pip3 install -r requirements.txt

## Install tesseract
apt install tesseract-ocr

## Create `xml/haarcascade` directory
mkdir xml
cd xml
mkdir haarcascade
cd haarcascade

## Install xml file for test
wget https://raw.githubusercontent.com/opencv/opencv/4.x/data/haarcascades/haarcascade_frontalface_default.xml
wget https://raw.githubusercontent.com/opencv/opencv/4.x/data/haarcascades/haarcascade_eye_tree_eyeglasses.xml