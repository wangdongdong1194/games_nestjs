# Use official Node.js LTS image as the base
FROM node:22.22.0-alpine AS builder

# Set working directory
WORKDIR /app

# 安装构建依赖
RUN apk add --no-cache python3 make g++

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy source code
COPY . .

# Build the app (if using TypeScript)
RUN npm run build

FROM node:22.22.0-alpine AS production
WORKDIR /app

# 只复制 package.json 并重新安装依赖，避免 node_modules 拷贝问题
COPY --from=builder /app/package*.json ./
RUN apk add --no-cache python3 make g++ \
	&& npm ci --omit=dev

# 复制构建产物
COPY --from=builder /app/dist ./dist

# Expose port (default NestJS port)
EXPOSE 3000

# Start the app
CMD ["node", "dist/main.js"]
