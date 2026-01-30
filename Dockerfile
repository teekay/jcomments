# Stage 1: Build the application
# Use a Node.js image
FROM node:22 as builder

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY yarn.lock ./

# Install dependencies
RUN yarn

# Copy the rest of your app's source code
COPY . .

# Build your TypeScript app
RUN yarn build
