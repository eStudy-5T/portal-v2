FROM node:16-alpine

ENV GOOGLE_CALLBACK_URL=https://api.letmeet.xyz/api/auth/google/callback
ENV FACEBOOK_CALLBACK_URL=https://api.letmeet.xyz/api/auth/facebook/callback
ENV VNPAY_RETURN_BASE_URL=https://letmeet.xyz/course-details

RUN apk update && apk upgrade

WORKDIR /usr/src/app
COPY . .
RUN yarn global add pm2
EXPOSE 9000
CMD ["pm2-runtime", "./ecosystem.json"]