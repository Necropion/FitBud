# Step 1: Builder
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files & install deps
COPY package*.json ./
RUN npm install

# Copy source
COPY . .

# Accept env var as build ARG
ARG VITE_AUTHENTICATION_URL
ARG VITE_TRAINING_URL

# Export it as ENV so Vite picks it up
ENV VITE_AUTHENTICATION_URL=$VITE_AUTHENTICATION_URL
ENV VITE_TRAINING_URL=$VITE_TRAINING_URL

# Build the Vite project
RUN npm run build

# Step 2: Production - Nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# Add custom Nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]