#!/bin/bash

## Update packages
sudo yum update -y

## Install python and pip
### Check and install python3
python3Version=$(python3 --version)

if [[ -z "$python3Version" ]]
then
  sudo yum install python3
  printf "Python has been just installed: $(python3 --version)"
else
  printf "Python is installed: $python3Version"
fi

### Check and install pip3
pip3Version=$(pip3 --version)

if [[ -z "$pip3Version" ]]
then
  sudo yum install python3-pip

  ### Check version of `node` and `npm`
  printf "PIP has just been installed: $(node -v)"
else
  printf "PIP is installed: $pip3Version"
fi

## Move to `python`
cd python

## Install packages in `requirements.txt`
pip3 install -r requirements. txt

## Install tesseract
sudo yum install tesseract-ocr

## Create `xml/haarcascade` directory
mkdir xml
cd xml
mkdir haarcascade
cd haarcascade

## Install xml file for test
wget https://raw.githubusercontent.com/opencv/opencv/4.x/data/haarcascades/haarcascade_frontalface_default.xml
wget https://raw.githubusercontent.com/opencv/opencv/4.x/data/haarcascades/haarcascade_eye_tree_eyeglasses.xml


## Go back
cd ../