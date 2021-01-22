FROM node:14

WORKDIR /packages/frontend

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 5001

RUN npm run build

# Remove line below if running from docker-compose
CMD ["npm", "run", "start"]