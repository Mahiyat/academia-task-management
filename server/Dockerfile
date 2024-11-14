FROM node:20.17.0

WORKDIR /app

ADD package.json .
ADD yarn.lock .

RUN bash -c "yarn install"

COPY . .

EXPOSE 5000

CMD ["yarn", "start"]