# Use the official Node.js image from the Docker Hub
FROM node

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Command to run the app
CMD ["node", "index.js"]
