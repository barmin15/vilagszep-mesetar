# Use the official Maven image to build the application
FROM maven:3.8.4-openjdk-17-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the backend source code
COPY . .

# Set the working directory for the frontend
WORKDIR /app/src/main/resources/public

# Copy the built React app from the ClientVilagszep container
COPY --from=client-builder /app/build .

# Go back to the source root of the backedn files
WORKDIR /app

# Continue with the backend build
RUN mvn clean package

# Use the official OpenJDK 17 image as a base image
FROM openjdk:17-jdk-slim

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/ServerMesetar/target/ServerMesetar-0.0.1-SNAPSHOT.jar app.jar

# Specify the command to run the application
CMD ["java", "-jar", "app.jar"]