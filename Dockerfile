FROM node:14-alpine

RUN apk update && apk upgrade

WORKDIR /usr/src/app
COPY . .
RUN yarn

EXPOSE 8181
CMD ["pm2-runtime", "./ecosystem.json"]