docker stop $(docker ps -aqf name="portal*") || exit 0
docker rm $(docker ps -aqf name="portal*")