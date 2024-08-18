#!/bin/bash

. ./utils.sh

# Change directory to `backend`
infoln "Change directory to /home/backend"
cd /home/backend

# Install NodeJS Server
infoln "Installing NodeJS Dependencies..."
bash nodejs/scripts/install.sh
infoln "Done!"

# Change directory to `backend`
cd /home/backend

# Install Python
infoln "Installing Python Packages, Tesseract OCR..."
bash python/scripts/install.sh
infoln "Done!"

# Change directory to `backend`
cd /home/backend

# Start server
infoln "Booting server..."
bash nodejs/scripts/start.sh
infoln "Done!"