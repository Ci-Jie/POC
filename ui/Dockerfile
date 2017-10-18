FROM httpd:2.2-alpine

MAINTAINER CiJie.Li(cjlee8110@gmail.com)

USER root

WORKDIR /usr/local/apache2/htdocs/

RUN apk update && \
    apk add --no-cache git nodejs && \
    git clone https://github.com/Ci-Jie/POC.git -b master

WORKDIR POC/ui

RUN npm install && \
    chmod +x entrypoint.js && \
    chmod +x entrypoint.sh

EXPOSE 80

ENTRYPOINT ["node", "entrypoint.js"]
