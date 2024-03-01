# Stage 1: Build the application
# Use a Node.js image
FROM node:20-alpine as builder

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Build your TypeScript app
RUN npm run build

# At this point, you can add steps to copy the output from /usr/src/app/dist 
# to another stage if you want to create a smaller, production-ready image.
# Since you're only interested in the build, this Dockerfile stops here.
