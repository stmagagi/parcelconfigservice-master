# use a node base image
FROM node:latest

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 8082

CMD [ "npm", "start" ]