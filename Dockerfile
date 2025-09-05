## 1. Dependencies 단계
#FROM node:18.17.0 AS dependencies
#WORKDIR /my-project
#COPY package.json yarn.lock ./
##RUN yarn install
##
## 2. Builder 단계
#FROM node:18.17.0 AS builder
#WORKDIR /my-project
##COPY . .
#COPY .env.production .env
#COPY --from=dependencies /my-project/node_modules ./node_modules
##// --from=dependencies 는 위에 dependencies 단계에서 나온 node_modules 를 사용하겠다는 의미
#RUN yarn build

# 3. Runner 단계
FROM node:22.18.0
WORKDIR /my-project
ENV NODE_ENV production
COPY /next.config.ts ./
COPY /public ./public
COPY /.next ./.next
COPY /logs ./logs
ARG ENV_FILE=.env.production
COPY /${ENV_FILE} ./.env
COPY /node_modules ./node_modules
COPY /package.json ./package.json

RUN mkdir -p /my-project/logs

ENV HOSTNAME="0.0.0.0"
EXPOSE 3000

CMD ["yarn", "start", "-p", "3000"]