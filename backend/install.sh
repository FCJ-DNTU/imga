#!/bin/bash

# Change directory to `backend`
cd /home/backend

# Install NodeJS Server
bash nodejs/scripts/install.sh

# Change directory to `backend`
cd /home/backend

# Install Python
bash python/scripts/install.sh

# Change directory to `backend`
cd /home/backend

# Start server
bash nodejs/scripts/start.sh