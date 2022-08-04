# syntax=docker/dockerfile:1

FROM node:12-alpine

# ENV NODE_ENV=development

WORKDIR /app

COPY ["package*.json","./"]

RUN npm install

COPY . .