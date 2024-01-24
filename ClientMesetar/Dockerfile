# Use the official Node image as the base image
FROM node:14 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire client directory into the container
COPY . .

# Build the React app
RUN npm run build

# Create a new image for the production build
FROM nginx:alpine

# Copy the build output to the NGINX public directory
COPY --from=build /app/build ../ServerMesetar/src/main/resources/public/

# Expose the port that NGINX will run on
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
