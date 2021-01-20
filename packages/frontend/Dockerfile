FROM node:14

WORKDIR /frontend

COPY package*.json ./

RUN npm ci --only=production

COPY . ./frontend

EXPOSE 5000

RUN npm run build

RUN ["npm", "run", "start"]