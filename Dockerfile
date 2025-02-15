FROM node:18-alpine AS build
WORKDIR /app

COPY package*.json /app/
RUN npm ci
COPY . /app/
RUN npm run
RUN cat package.json
RUN npm run build:lib
RUN npm run build:app

FROM node:18-alpine
COPY --from=build /app/dist /app/dist
WORKDIR /app/server
COPY ./server/package*.json /app/server/
COPY ./version.txt /app/
RUN npm ci
COPY ./server /app/server
RUN npx tsc
RUN npm prune --production


EXPOSE 3003
ENTRYPOINT ["node", "dist/server.js"]
