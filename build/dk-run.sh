#https://hub.docker.com/_/couchdb/
#https://rskupnik.github.io/docker_series_2_connecting_containers

sudo docker stop nodedb mycouchdb
sudo docker rm nodedb mycouchdb
sudo docker run -p 5984:5984 -d -v /opt/couchdb/data:/opt/couchdb/data --net=netdb --name mycouchdb couchdb 
sudo docker run -p 8080:8080 -v $PWD:/home -d --net=netdb  --name nodedb node-db-server
