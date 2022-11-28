## My Server
```bash
sudo ssh -i ~/Desktop/pem/storeApi.pem ubuntu@ec2-3-7-68-106.ap-south-1.compute.amazonaws.com
```
## Upload file to ec2

#### 1.
```bash
sudo mkdir /opt/front-end
```

#### 2.
```bash
sudo chown ubuntu:ubuntu /opt/front-end
```

#### 3.
```bash
scp -i <path-to-key-file> -r <path-to-local-dist-folder>/* ubuntu@<domain name>:/opt/front-end
   Example: scp -i ~/Downloads/my-aws-key.pem -r ~/Downloads/angular-8-registration-login-example/dist/* ubuntu@ec2-3-7-68-106.ap-south-1.compute.amazonaws.com:/opt/frontend
```

## My Server

### New Instance
```bash
sudo chown ubuntu:ubuntu /usr/share/nginx/html
```

```bash
sudo scp -i ~/Desktop/pem/storeApi.pem -r ./dist/store-admin/* ubuntu@ec2-3-7-68-106.ap-south-1.compute.amazonaws.com:/usr/share/nginx/html
```
