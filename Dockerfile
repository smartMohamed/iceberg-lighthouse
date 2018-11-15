FROM node:8-alpine as base

# Installs latest Chromium package.
RUN apk --no-cache upgrade && apk add --no-cache chromium

RUN mkdir -p /usr/src/lighthouse
WORKDIR /usr/src/lighthouse

COPY package.json .
COPY yarn.lock .

RUN yarn --ignore-optional --prod

COPY lib ./lib

EXPOSE 3000

CMD ["npm", "start"]
