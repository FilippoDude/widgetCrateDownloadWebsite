#!/bin/sh

if [ -f "done" ]; then
  echo "Setup already completed. Skipping installation steps."
else
  apt-get update -y
  
  apt-get install -y nano screen curl
  apt-get install -y nodejs npm

  apt-get clean
  touch done
fi
npm install
cd /app
npm run build
npm start


echo ""
echo "Server Ready!"
echo ""

tail -f /dev/null
