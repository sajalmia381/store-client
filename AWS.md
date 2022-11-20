## Upload file to ec2

1. sudo mkdir /opt/front-end
2. sudo chown ubuntu:ubuntu /opt/front-end
3. scp -i <path-to-key-file> -r <path-to-local-dist-folder>/\* ubuntu@<domain name>:/opt/front-end
   Example: scp -i ~/Downloads/my-aws-key.pem -r ~/Downloads/angular-8-registration-login-example/dist/\* ubuntu@ec2-3-7-68-106.ap-south-1.compute.amazonaws.com:/opt/frontend

## My Server
sudo ssh -i ~/Desktop/pem/storeApi.pem ubuntu@ec2-3-7-68-106.ap-south-1.compute.amazonaws.com

## Upload file to ec2

1. sudo mkdir /opt/front-end

2. sudo chown ubuntu:ubuntu /opt/front-end

3. scp -i <path-to-key-file> -r <path-to-local-dist-folder>/\* ubuntu@<domain name>:/opt/front-end
   Example: scp -i ~/Downloads/my-aws-key.pem -r ~/Downloads/angular-8-registration-login-example/dist/\* ubuntu@ec2-3-7-68-106.ap-south-1.compute.amazonaws.com:/opt/frontend

## My Server

### New Instance

$ sudo chown ubuntu:ubuntu /usr/share/nginx/html

$ sudo scp -i ~/Desktop/pem/storeApi.pem -r ./dist/store-admin/\* ubuntu@ec2-3-7-68-106.ap-south-1.compute.amazonaws.com:/usr/share/nginx/html
