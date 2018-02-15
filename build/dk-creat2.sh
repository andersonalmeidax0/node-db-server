curl https://raw.githubusercontent.com/andersonalmeidax0/node-db-server/master/build/Dockerfile > Dockerfile
curl https://raw.githubusercontent.com/andersonalmeidax0/node-db-server/master/build/server.js > server.js
curl https://raw.githubusercontent.com/andersonalmeidax0/node-db-server/master/build/index.html > index.html
curl https://raw.githubusercontent.com/andersonalmeidax0/node-db-server/master/build/dk-creat2.sh > dk-creat2.sh
docker build --no-cache -t="node-db-server"
sudo docker push node-db-server
#docker run -d node-db-server


