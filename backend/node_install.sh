#!/bin/bash

## Update packages
sudo yum update -y

## Install nodejs
### Install `nvm`
nvmVersion=$(nvm -v)

if [[ -z "$nvmVersion" ]]
then
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # This loads nvm bash_completion

  printf "NVM has just been installed: $(nvm -v)"
else
  printf "NVM is installed: $nvmVersion"
fi

nodeVersion=$(node -v)

if [[ -z "$nodeVersion" ]]
then
  ### Install node 20
  nvm install node 20

  ### Check version of `node` and `npm`
  printf "Node has just been installed: $(node -v)"
  printf "NPM has just been installed: $(npm -v)"
else
  printf "Node is installed: $nvmVersion"
  printf "NPM is installed: $(npm -v)"
fi

## Move to `nodejs`
cd nodejs

## Install packages in `package.json`
npm install
npm install -g pm2

## Go back
cd ../