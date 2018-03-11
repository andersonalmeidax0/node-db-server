#v2
#curl https://raw.githubusercontent.com/andersonalmeidax0/node-db-server/master/build/dk-creat2.sh > dk-creat2.sh
curl https://raw.githubusercontent.com/andersonalmeidax0/node-db-server/master/build/Dockerfile > Dockerfile
curl https://raw.githubusercontent.com/andersonalmeidax0/node-db-server/master/build/Dockerfile.base > Dockerfile.base
#curl https://raw.githubusercontent.com/andersonalmeidax0/node-db-server/master/build/server.js > server.js
#curl https://raw.githubusercontent.com/andersonalmeidax0/node-db-server/master/build/index.html > index.html
#o "." do comando abaixo eh o contexto
docker build --no-cache -t="node-base" -f ./Dockerfile.base  .
docker build --no-cache -t="node-db-server" .
sudo docker push node-db-server
sudo docker push node-base
#docker run -d node-db-server


