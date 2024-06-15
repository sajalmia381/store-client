## STAGE 1: Build Container
FROM node:20-slim as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:ssr

## STAGE 2: Production container
FROM node:20-slim

ENV STORE_CLIENT_API_BASE_URL ''
# Server Port
ENV STORE_CLIENT_PORT ''

ENV STORE_GA ''
ENV STORE_ADSENSE_CLIENT_ID ''

## Container Working path 
WORKDIR /app

## Copy builded code
COPY ./dist ./dist

## Prepare sh script file
COPY run.sh ./run.sh
RUN chmod +x ./run.sh
RUN sed -i -e 's/\r$//' ./run.sh

## Expose container port
EXPOSE 4000

## Start the application
ENTRYPOINT ["/app/run.sh"]