# Build stage - Base image for Node.js
FROM node:22-alpine

# Create a non-root user and group for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json as root
COPY package*.json ./

# Install dependencies as root (npm requires this)
RUN npm install --prefer-offline --no-audit && \
    npm cache clean --force

# Copy the rest of the application
COPY . .

# Set proper file ownership to nodejs user
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose the backend port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/health', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start the server
CMD ["npm", "run", "dev"]
