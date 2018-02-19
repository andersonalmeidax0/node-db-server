sudo docker run -p 5984:5984 -d -v /opt/couchdb/data:/opt/couchdb/data --net=netdb --name mycouchdb couchdb 
