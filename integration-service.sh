#!/bin/bash
curl -O http:/192.168.50.11/images/pcservice.tar.gz
echo "Start load Dockerimage"
docker load -i pcservice.tar.gz
echo "Start load Dockerimage"
if [ ! "$(docker network ls | grep pcnetwork)" ]; then
  echo "Creating pcnetwork network ..."
  docker network create pcnetwork
else
  echo "pcnetwork network exists."
fi
echo "Network checked!"
echo "Docker container stop ..."
docker stop pcservice
echo "Docker container remove ..."
docker rm pcservice
echo "Docker container create ..."
docker run -p 8082:8082 --name="pcservice" --network="pcnetwork" -d pcservice
echo "Docker container running ..."
