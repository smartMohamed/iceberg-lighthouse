FROM node:8-alpine as base

# Installs latest Chromium package.
RUN apk --no-cache upgrade && apk add --no-cache chromium

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn --ignore-optional

COPY lib ./lib

EXPOSE 3000

CMD ["npm", "start"]
