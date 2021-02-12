FROM node:14

WORKDIR /packages/frontend

ARG NEXT_PUBLIC_BACKEND_URL 
ARG BACKEND_URL

COPY package*.json ./

RUN npm ci

COPY . .

RUN echo "NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}" >> .env.production
RUN echo "BACKEND_URL=${BACKEND_URL}" >> .env.production

EXPOSE 5001

RUN npm run build

# Remove line below if running from docker-compose
CMD ["npm", "run", "start"]