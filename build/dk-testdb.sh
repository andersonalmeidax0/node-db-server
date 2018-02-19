#    docker run -v /opt/couchdb/data:/opt/couchdb/data -p 5984:5984 -t -i --network netdb couchdb /bin/bash
sudo docker run -p 5984:5984 -v /opt/couchdb/data:/opt/couchdb/data -t -i --net=netdb --name mycouchdb couchdb /bin/bash
