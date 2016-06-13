FROM node:6

RUN mkdir /app
WORKDIR /app

ADD ./package.json /app/package.json
RUN npm install
RUN npm install http-server -g

ADD . /app

ENV NODE_ENV production
RUN npm run build

EXPOSE 80

CMD [ "http-server", "-p", "80", "./build" ]
