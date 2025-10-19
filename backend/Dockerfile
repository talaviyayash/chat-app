# ---------- Dev Stage ----------
    FROM node:20-alpine AS dev
    WORKDIR /usr/src/app
    
    # Copy package files and install all deps (dev + prod)
    COPY package*.json ./
    RUN npm install
    
    # Copy full source code
    COPY . .
    
    # Run in dev mode (hot reload with ts-node-dev/nodemon)
    CMD ["npm", "run", "dev"]
    
    # ---------- Prod Stage ----------
    FROM node:20-alpine AS prod
    WORKDIR /usr/src/app
    
    # Copy package files and install only production deps
    COPY package*.json ./
    RUN npm install
    
    # Copy source + build it
    COPY . .
    RUN npm run build
    
    # Run compiled JS
    CMD ["npm", "run", "start"]
    