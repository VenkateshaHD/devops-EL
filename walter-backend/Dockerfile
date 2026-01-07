FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

#  docker build -t chat-backend:1.0 .    

# docker run --env-file .env --network app-network -p 5001:3000 chat-backend:1.0

