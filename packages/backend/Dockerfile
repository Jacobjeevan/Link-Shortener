FROM node:14

WORKDIR /packages/backend

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 5000

# Remove line below if running from docker-compose
CMD ["npm", "run", "start"]