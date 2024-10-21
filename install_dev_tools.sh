#!/bin/bash

# Update package list and upgrade existing packages
sudo apt update && sudo apt upgrade -y

# Install Python
sudo apt install -y python3 python3-pip

# Install Node.js and npm (includes npm, which is needed for React)
sudo apt install -y nodejs npm

# Install FastAPI and Uvicorn
sudo apt install -y python3-fastapi python3-uvicorn

# Install React globally using npm
sudo npm install -g create-react-app

# Download and install IntelliJ IDEA (Community Edition) and PyCharm (Community Edition) from JetBrains
# For Ubuntu-based systems, JetBrains Toolbox can be used to manage installations
curl -L "https://download.jetbrains.com/toolbox/jetbrains-toolbox-1.26.3.13458.tar.gz" -o jetbrains-toolbox.tar.gz
tar -xzf jetbrains-toolbox.tar.gz
cd jetbrains-toolbox-*/
./jetbrains-toolbox

# Clean up installation files
cd ..
rm -rf jetbrains-toolbox*

