FROM node:current-alpine3.14

COPY . /app
WORKDIR /app

RUN npm install 

RUN npm run build

CMD [ "npm", "run", "start:prod" ]
