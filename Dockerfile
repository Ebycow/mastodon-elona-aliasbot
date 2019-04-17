FROM node:latest

WORKDIR /mastodon-elona-aliasbot

COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
COPY ndata.csv ./

RUN npm i
RUN npx tsc

CMD ["node", "dist/index"]