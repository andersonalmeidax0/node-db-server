sudo docker run -p 5984:5984 -v /opt/couchdb/data:/opt/couchdb/data -t -i --network netdb --name mycouchdb couchdb /bin/bash
