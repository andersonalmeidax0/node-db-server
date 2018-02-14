FROM alpine
RUN apk update
RUN apk add nginx
RUN apk add mc
WORKDIR /usr/src/app
COPY . .
EXPOSE 8080
CMD ["node","server.js"]
