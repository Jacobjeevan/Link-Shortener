FROM node:14

WORKDIR /packages/frontend

COPY package*.json ./

RUN npm ci --only=production

COPY . .

EXPOSE 5000

RUN npm run build

RUN ["npm", "run", "start"]