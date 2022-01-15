## STAGE 1: Build app
FROM node:16.13.1-alpine as builder
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run prod

## STAGE 2: Setup Server
FROM nginx:1.21.5-alpine

# Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist/store-admin /usr/share/nginx/html

EXPOSE 3000

CMD nginx -g "daemon off;"