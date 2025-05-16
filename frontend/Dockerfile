# Use Node.js image for building the frontend
FROM node:18 AS build

# Set working directory and install dependencies
WORKDIR /app
COPY package*.json ./
RUN npm install

# Copy the source code and build the app
COPY . .
RUN npm run build

# Serve the built files using an Nginx server
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80
