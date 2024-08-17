#!/bin/bash

## Update packages
apt update

## Install curl
apt install curl

## Install nodejs
### Install `nvm`
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # This loads nvm bash_completion

printf "NVM has just been installed: $(nvm -v)"

### Install node 20
nvm install node 20

### Change directory to `nodejs`
cd /home/backend/nodejs

### Check version of `node` and `npm`
printf "Node has just been installed: $(node -v)"
printf "NPM has just been installed: $(npm -v)"

## Install packages in `package.json`
npm install
npm install -g pm2