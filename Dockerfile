FROM node:18 AS builder

WORKDIR /app

COPY client/package*.json ./

# Instalar dependencias
RUN npm install

COPY ./client .

RUN npm run build

FROM node:18

WORKDIR /app

COPY server/package*.json ./

RUN npm install

COPY ./server .

COPY --from=builder /app/build /app/statics

EXPOSE 8000

CMD ["node", "application.js"]