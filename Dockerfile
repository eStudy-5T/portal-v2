FROM node:16-alpine

RUN apk update && apk upgrade

WORKDIR /usr/src/app
COPY . .
RUN yarn global add pm2
EXPOSE 9000
CMD ["pm2-runtime", "./ecosystem.json"]