################# Development #################

# build stage
#FROM node:10-alpine as build
#
#WORKDIR /usr/src/app
#
#RUN yarn
#
#CMD ["yarn", "dev"]

################# Production #################
# build stage
FROM node:10-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn

RUN yarn global add typescript

COPY . .

RUN yarn build

# run stage
FROM node:10-alpine

RUN yarn global add pm2

COPY --from=build /usr/src/app/package.json package.json

RUN yarn

COPY --from=build /usr/src/app/dist/ .

CMD ["pm2-runtime", "server.js"]
