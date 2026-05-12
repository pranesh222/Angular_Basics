# -----------------------------
# Stage 1: Build Angular App
# -----------------------------
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:docker

# -----------------------------
# Stage 2: Serve Using Nginx
# -----------------------------
FROM nginx:alpine

COPY --from=build /app/dist/angular/browser /usr/share/nginx/html

EXPOSE 80