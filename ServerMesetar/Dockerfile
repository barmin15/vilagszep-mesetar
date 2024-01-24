# Use the official OpenJDK 17 image as a base image
FROM openjdk:17-jdk-slim AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the JAR file into the container
COPY target/ServerMesetar-0.0.1-SNAPSHOT.jar app.jar

# Specify the command to run the application
CMD ["java", "-jar", "app.jar"]
