# Use an official Node.js runtime as a parent image
FROM node:18-alpine as client-builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Create a new image to serve the built files
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the built files from the client-builder stage
COPY --from=client-builder /app/build /app/build

# Specify the command to run on container start
CMD ["npm", "start"]
