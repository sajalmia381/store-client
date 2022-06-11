#!/bin/bash

# echo '[INFO] Starting Config Initialization'

# find /usr/share/nginx/html/main*.js -type f -exec sed -i 's@API_ENDPOINT@'"$API_ENDPOINT"'@' {} +

# echo '[INFO] Config Initialization Completed'

echo '[INFO] Starting Nginx'

nginx -g 'daemon off;'
