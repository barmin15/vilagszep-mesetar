package org.vilagszep.servermesetar.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final UserAuthenticationEntryPoint userAuthenticationEntryPoint;

    private final UserAuthProvider userAuthProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .exceptionHandling((exception) -> exception.authenticationEntryPoint(userAuthenticationEntryPoint))
                .addFilterBefore(new JwtAuthFilter(userAuthProvider), BasicAuthenticationFilter.class)
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement((session) -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests((requests) -> requests
                        .requestMatchers("/api/admin/**").hasAuthority(UserRole.ADMIN.name())
                        .requestMatchers("/api/storyBag/admin/**").hasAuthority(UserRole.ADMIN.name())
                        .requestMatchers("/api/country/admin/**").hasAuthority(UserRole.ADMIN.name())
                        .requestMatchers("/api/story/admin/**").hasAuthority(UserRole.ADMIN.name())
                        .requestMatchers("/api/auth/admin/**").hasAuthority(UserRole.ADMIN.name())
                        .requestMatchers("/api/user/admin/**").hasAuthority(UserRole.ADMIN.name())
                        .requestMatchers("/", "/login", "/app/**").permitAll()
                        .requestMatchers( "/index.html", "/favicon.ico", "/static/css/**", "/static/js/**", "/static/media/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
                        .anyRequest().authenticated()
                );
        return http.build();
    }
}
