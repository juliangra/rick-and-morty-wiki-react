#!/bin/bash

destination="/var/www/html/project3"

# Install dependencies
npm ci

# Builds project
npm run build

# If folder exists, remove it
if [ -d $destination ]
then
    sudo rm -rf $destination
fi

# Create folder
sudo mkdir $destination

# Copy files from build to destination
sudo rsync -a build/ $destination
