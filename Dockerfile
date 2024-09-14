FROM node:18-alpine

WORKDIR /app

COPY .env .env
COPY . .

EXPOSE 3000

RUN npm install

CMD ["sh", "-c", "npm run migration:up && npm run seed && npm run dev"]
