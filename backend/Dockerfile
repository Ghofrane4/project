# Use the official Node.js image as a base
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port (change if your app uses a different port)
EXPOSE 3000

# Start the server
CMD ["npm", "run", "migrate", "&&", "npm", "run", "seed", "&&", "node", "server.js"]
