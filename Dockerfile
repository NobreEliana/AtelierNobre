FROM node:12.7-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY --chown=node:node . .
RUN npm run prod-build 

FROM node:12.7-alpine
WORKDIR /var/www/hnl-angular-ateliernobre-app
COPY --from=build /usr/src/app/server.js .
COPY --from=build /usr/src/app/dist ./dist
RUN npm install express@4.16.2
EXPOSE 8080

CMD [ "node", "server.js" ]