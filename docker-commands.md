# commands

## create docker network
docker network create mongo-network

## start mongodb 
docker run -d \
-p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=root \
--net mongo-network \
--name mongo-db \
mongo

## start mongo-express
docker run -d \
-p 8081:8081 \
-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
-e ME_CONFIG_MONGODB_ADMINPASSWORD=root \
-e ME_CONFIG_MONGODB_URL=mongodb://admin:root@mongo-db:27017/ \
--net mongo-network
--name mongo-express
mongo-express
