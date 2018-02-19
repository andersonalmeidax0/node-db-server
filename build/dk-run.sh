#https://hub.docker.com/_/couchdb/
#https://rskupnik.github.io/docker_series_2_connecting_containers
sudo docker run -p 8080:8080 -v $PWD:/home -d --net=netdb  --name nodedb node-db-server
