# Stage 1: Build the React frontend
FROM node:18 AS frontend-builder

WORKDIR /appfileokban
# Copy only the necessary files for npm install to take advantage of Docker cache
COPY ClientMesetar/ .

RUN npm install

# Build the React app
RUN npm run build

# Stage 2: Build the Spring Boot backend
FROM maven:3.8.4-openjdk-17-slim AS backend-builder

WORKDIR /app

# Copy only the necessary files for mvn install to take advantage of Docker cache
COPY ServerMesetar/pom.xml .

RUN mvn dependency:go-offline

# Copy the rest of the application code
COPY ServerMesetar/ .

# Copy the built frontend files into the backend resources/public directory
COPY --from=frontend-builder /appfileokban/build /app/src/main/resources/public

# Build the Spring Boot app
RUN mvn clean package

# Stage 3: Final image with only the built artifacts
FROM openjdk:17-jdk-slim AS final

WORKDIR /app

# Copy the JAR file from the backend builder stage
COPY --from=backend-builder /app/target/ServerMesetar-0.0.1-SNAPSHOT.jar .

# Expose the port that your Spring Boot application will run on
EXPOSE 8080

# Command to run the Spring Boot application
CMD ["java", "-jar", "ServerMesetar-0.0.1-SNAPSHOT.jar"]
