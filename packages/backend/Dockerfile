FROM node:14

WORKDIR /packages/backend

COPY package*.json ./

ARG Redis_session_name
ARG Redis_session_secret
ARG Redis_session_age
ARG REDIS_URL
ARG MONGO_URL

RUN npm ci --only=production

COPY . .

EXPOSE 5000

RUN mkdir -p config
RUN echo "Redis_session_name=${Redis_session_name}" >> config/.env.prod
RUN echo "Redis_session_secret=${Redis_session_secret}" >> config/.env.prod
RUN echo "Redis_session_age=${Redis_session_age}" >> config/.env.prod
RUN echo "REDIS_URL=${REDIS_URL}" >> config/.env.prod
RUN echo "MONGO_URL=${MONGO_URL}" >> config/.env.prod
RUN echo "SendinBlue_API=${SendinBlue_API}" >> config/.env.prod
RUN echo "Email=${Email}" >> config/.env.prod

# Remove line below if running from docker-compose
CMD ["npm", "run", "start"]