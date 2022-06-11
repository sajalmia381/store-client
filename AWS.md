## Upload file to ec2

1. sudo mkdir /opt/front-end
2. sudo chown ubuntu:ubuntu /opt/front-end
3. scp -i <path-to-key-file> -r <path-to-local-dist-folder>/\* ubuntu@<domain name>:/opt/front-end
   Example: scp -i ~/Downloads/my-aws-key.pem -r ~/Downloads/angular-8-registration-login-example/dist/\* ubuntu@ec2-52-221-185-40.ap-southeast-2.compute.amazonaws.com:/opt/frontend

## My Server

## Upload file to ec2

1. sudo mkdir /opt/front-end
2. sudo chown ubuntu:ubuntu /opt/front-end
3. scp -i <path-to-key-file> -r <path-to-local-dist-folder>/\* ubuntu@<domain name>:/opt/front-end
   Example: scp -i ~/Downloads/my-aws-key.pem -r ~/Downloads/angular-8-registration-login-example/dist/\* ubuntu@ec2-52-221-185-40.ap-southeast-2.compute.amazonaws.com:/opt/frontend

## My Server

### New Instance

$ sudo scp -i ~/Desktop/pem/storeApi.pem -r ./dist/store-admin/\* ubuntu@ec2-65-2-138-99.ap-south-1.compute.amazonaws.com:/usr/share/nginx/html

### Old

$ sudo scp -i ~/Desktop/pem/storeApi.pem -r ./dist/store-admin/\* ubuntu@ec2-52-66-223-120.ap-south-1.compute.amazonaws.com:/usr/share/nginx/html
