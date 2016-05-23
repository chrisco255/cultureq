FROM node:6

RUN mkdir /app
WORKDIR /app
ADD . /app
RUN npm install
RUN npm install http-server -g
RUN npm run webpack
EXPOSE 80

CMD [ "http-server", "-p", "80", "./dist" ]