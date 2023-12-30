# Deployment Store-Api App

### Create Docker Store-Api Network
```sh
docker network create store-network
```
### Build docker image for multipe build architect
```sh
docker buildx use store-builder
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t storerestapi/store-client:1.0.0 --push .
docker buildx imagetools create -t storerestapi/store-client:1.0.0 storerestapi/store-client:latest
```

### Build Docker Images with docker-compose
```sh
docker-compose -f docker-compose.client.yml build
```

### Up docker images
```sh
docker-compose -f docker-compose.client.yml up -d
docker-compose -f docker-compose.client.yml up --no-deps -d
```

### Down docker images
```sh
docker-compose -f docker-compose.client.yml down -v
```

### Restart Service
```sh
docker-compose -f docker-compose.client.yml restart --no-deps
```

#### Ex.
```bash
sudo scp -i ~/Desktop/pem/storeApi.pem -r ./dist/store-client/* ubuntu@ec2-3-7-68-106.ap-south-1.compute.amazonaws.com:/usr/share/nginx/html
```


### Thanks to those article for deployment on ec2 with docker container
- [https://robert-isaac.medium.com/deploying-angular-ssr-and-nestjs-application-to-vps-bf7e400a7b48](https://robert-isaac.medium.com/deploying-angular-ssr-and-nestjs-application-to-vps-bf7e400a7b48)


# Generate SSL
```bash
sudo openssl req -x509 -nodes -days 365 -subj "/C=CA/ST=QC/O=Company, Inc./CN=test.storerestapi.com" -addext "subjectAltName=DNS:test.storerestapi.com" -newkey rsa:2048 -keyout /etc/ssl/private/nginx-selfsigned.key -out /etc/ssl/certs/nginx-selfsigned.crt;
```

### Build docker image for multipe build architect
```sh
docker buildx ls
docker buildx create --name store-builder
docker buildx use store-builder
docker buildx inspect --bootstrap
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t <username>/<store-client:x.x.x> --push .
docker buildx imagetools create -t <username>/<store-client:x.x.x> <username>/<store-client:latest>
docker run --name store-api -d -p 8000:8000 <store-client:latest>:<943e28233b51>
```


# nginx

### update nginx file: 
  file location: /etc/nginx/sites-available/default

### restart nginx 
```
systemctl restart nginx
```

### check nginx status
```
nginx -t
```