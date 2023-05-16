FROM node:18-alpine3.16

RUN apk add --update ffmpeg
RUN apk add --no-cache file
RUN apk --update add imagemagick

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
