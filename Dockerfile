FROM node:14.16.1-buster
WORKDIR /usr/src/kiosk
COPY package.json .
COPY ormconfig.json .
RUN npm install
COPY . .

RUN npm run --script build
CMD node dist/main.js