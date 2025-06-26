FROM node:20-alpine

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=root

RUN mkdir -p /home/app

COPY . /home/app

CMD ["node", "server.js"]