FROM node:8-alpine as base
LABEL maintainer="@mouafa"
LABEL description="lighthouse audit runner"
# Installs latest Chromium package.
RUN apk --no-cache upgrade && apk add --no-cache chromium

RUN mkdir -p /usr/src/lighthouse
WORKDIR /usr/src/lighthouse

COPY package.json yarn.lock .yarnclean ./
ENV NODE_ENV=production
RUN yarn --ignore-optional --prod

COPY lib ./lib

EXPOSE 3000

CMD ["npm", "start"]
