package org.vilagszep.servermesetar;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.vilagszep.servermesetar.config.DatabaseConfig;

@SpringBootApplication
@RequiredArgsConstructor
public class ServerMesetarApplication {
    private final DatabaseConfig databaseConfig;

    public static void main(String[] args) {
        SpringApplication.run(ServerMesetarApplication.class, args);
    }

    @PostConstruct
    public void insertAdmin() {
        databaseConfig.createAdmin();
        databaseConfig.createNoElementExceptionForStories();
    }
}
