FROM node:8.7-alpine

MAINTAINER CiJie.Li(cjlee8110@gmail.com)

USER root

RUN apk update && \
    apk add --no-cache git && \
    git clone https://github.com/Ci-Jie/POC.git -b master

WORKDIR POC/ui

RUN npm install && \
    chmod +x entrypoint.js

EXPOSE 8080

ENTRYPOINT ["node", "entrypoint.js"]
