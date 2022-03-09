
FROM node:14

WORKDIR /app

COPY package.json .

RUN npm inatall

COPY . .

EXPOSE 3100

CMD [ "node", "server.js" ]

