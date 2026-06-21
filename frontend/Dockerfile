# Build stage - Create optimized build
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --prefer-offline --no-audit && \
    npm cache clean --force

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Development stage - For development with hot reload
FROM node:22-alpine

WORKDIR /app

# Create a non-root user and group for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copy package files
COPY package*.json ./

# Install dependencies as root
RUN npm install --prefer-offline --no-audit && \
    npm cache clean --force

# Copy source code
COPY . .

# Copy built files from builder stage (if available)
COPY --from=builder /app/dist ./dist

# Set proper file ownership to nodejs user
RUN chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Expose Vite dev server port
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev"]
