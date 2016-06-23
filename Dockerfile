FROM node:6

RUN mkdir /app
WORKDIR /app

ADD ./package.json /app/package.json
RUN npm install

ADD . /app

ENV NODE_ENV production
RUN npm run build

EXPOSE 80

CMD [ "npm", "run", "start:prod" ]
