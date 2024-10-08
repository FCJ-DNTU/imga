#!/bin/bash

# Set up PATH
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # This loads nvm bash_completion

# Change directory to `nodejs`
cd /home/backend/nodejs

export PYTHON_PATH="/home/backend/python/venv/bin/python"
export TEMP_PATH="/home/backend/temp"
export UPLOADS_PATH="/home/backend/uploads"

## Setup AWS Resource Information
export AWS_REGION="your_region"
export BUCKET_NAME="your_bucket_name"

# Start NodeJS Server
npm start

pm2 logs