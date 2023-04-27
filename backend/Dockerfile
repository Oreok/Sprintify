FROM node:latest

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN npm install

RUN npm ci --only=production

EXPOSE 4000
CMD ["npm", "start"]