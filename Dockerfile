FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./src
RUN ls -a
RUN npm ci
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/build .
RUN npm i pm2 -g
CMD ["pm2-runtime","src/index.js"]