## Upload file to ec2

1. sudo mkdir /opt/front-end
2. sudo chown ubuntu:ubuntu /opt/front-end
3. scp -i <path-to-key-file> -r <path-to-local-dist-folder>/\* ubuntu@<domain name>:/opt/front-end
   Example: scp -i ~/Downloads/my-aws-key.pem -r ~/Downloads/angular-8-registration-login-example/dist/\* ubuntu@ec2-52-221-185-40.ap-southeast-2.compute.amazonaws.com:/opt/frontend

## My Server

- sudo scp -i ~/Desktop/pem/storeApi.pem -r ./dist/store-admin/\* ubuntu@ec2-13-126-172-117.ap-south-1.compute.amazonaws.com:/opt/frontend
