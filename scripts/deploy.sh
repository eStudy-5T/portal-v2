docker build . -t portal-v2
docker run -d -p 9000:9000 --name portal-v2 portal-v2