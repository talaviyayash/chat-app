FROM node:18-alpine AS dev

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Expose port
EXPOSE 5000

CMD ["npm", "run", "dev"]



FROM node:18-alpine AS prod

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# Expose port
EXPOSE 5000

CMD ["npm", "run", "start"]
