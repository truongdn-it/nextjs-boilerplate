FROM node:18-alpine

WORKDIR /app

# Copy lock files if file exists
COPY package.json yarn.lock* package-lock.json* ./

RUN npm install

COPY src ./src
COPY public ./public
COPY next.config.js .
# COPY next-i18next.config.js .
COPY tsconfig.json .
# COPY postcss.config.js .
# COPY tailwind.config.js .

CMD npm run dev



