FROM node:20.17.0

WORKDIR /app

ADD package.json .
ADD yarn.lock .

RUN bash -c "yarn install"

COPY . .

CMD ["yarn", "start"]