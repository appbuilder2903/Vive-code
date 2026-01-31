FROM node:18-alpine

# Install Docker CLI for sandboxed execution
RUN apk add --no-cache docker-cli

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY src ./src

# Build TypeScript
RUN npm run build

# Expose ports
EXPOSE 5000 8080

# Start server
CMD ["npm", "start"]
