# use a node base image
FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# set a health check
HEALTHCHECK --interval=5s \
            --timeout=5s \
            CMD curl -f http://127.0.0.1:8082

# port to expose
EXPOSE 8082
EXPOSE 27017

CMD [ "npm", "start" ]