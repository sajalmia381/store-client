# My Server

```bash
sudo ssh -i ~/Desktop/pem/storeApi.pem ubuntu@ec2-3-7-68-106.ap-south-1.compute.amazonaws.com
```

# Deployment Store-Api App

### Update Service

```sh
docker pull storerestapi/store-client:stable
docker compose -f docker-compose.api.yaml up -d --no-deps store-webapp
```

### Log

```sh
docker logs -f --tail 50 store-webapp ## Client
docker logs -f --tail 50 store-webserver ## Nginx Server
```

### Create Docker Store-Api Network

```sh
docker network create store-network
```

### Build docker image for multipe build architect

```sh
docker buildx use store-builder
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t storerestapi/store-client:4.1.1 --push .
docker buildx imagetools create -t storerestapi/store-client:stable storerestapi/store-client:4.1.1

npm run build:ssr
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t storerestapi/store-client:4.1.1 -f Dockerfile2 --push .
```

### Build Docker Images with docker-compose

```sh
docker compose -f docker-compose.api.yaml build
```

### Up docker images

```sh
docker compose -f docker-compose.api.yaml up -d
docker compose -f docker-compose.api.yaml up -d --no-deps store-webapp
```

### Down docker images

```sh
docker compose -f docker-compose.api.yaml down -v
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

# Build Webapp
```sh
npm run build
```

### Build docker image for multipe build architect

```sh
docker buildx ls
docker buildx create --name store-builder
docker buildx use store-builder
docker buildx inspect --bootstrap
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t <username>/<store-client:x.x.x> --push .
# Example: docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v7 -t storerestapi/store-client:5.0.2 --push .
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
