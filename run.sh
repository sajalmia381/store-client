#!/bin/bash

echo '[INFO] Starting Config Initialization'

echo $STORE_CLIENT_API_BASE_URL ''
# Server Port
echo $STORE_CLIENT_PORT ''
echo $STORE_GA ''
echo $STORE_ADSENSE_CLIENT_ID ''

find /app/dist/store-client/browser/main*.js -type f -exec sed -i 's@STORE_CLIENT_API_BASE_URL@'"$STORE_CLIENT_API_BASE_URL"'@' {} +
find /app/dist/store-client/browser/main*.js -type f -exec sed -i 's@STORE_GA@'"$STORE_GA"'@' {} +
find /app/dist/store-client/browser/main*.js -type f -exec sed -i 's@STORE_ADSENSE_CLIENT_ID@'"$STORE_ADSENSE_CLIENT_ID"'@' {} +

echo '[INFO] Config Initialization Completed'

echo '[INFO] Starting Node Server'

node /app/dist/store-client/server/server.mjs