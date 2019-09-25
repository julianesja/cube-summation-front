FROM node:lts-alpine as builder

RUN npm config set unsafe-perm true

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

COPY . .

# install project dependencies
RUN npm install

# build app for production with minification
RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]