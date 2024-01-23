package org.vilagszep.servermesetar.config;


import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;
import org.vilagszep.servermesetar.data.dto.UserDto;
import org.vilagszep.servermesetar.service.AuthService;
import org.springframework.security.core.Authentication;

import java.util.ArrayList;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.stream.Collectors;

import com.auth0.jwt.JWTVerifier;

@RequiredArgsConstructor
@Component
public class UserAuthProvider {
    private String secretKey = System.getenv("SECRET_KEY");

    private final AuthService authService;

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createToken(String login) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + 3_600_000);
        return JWT.create()
                .withIssuer(login)
                .withIssuedAt(now)
                .withExpiresAt(validity)
                .sign(Algorithm.HMAC256(secretKey));
    }

    public Authentication validateToken(String token) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secretKey))
                .build();
        DecodedJWT decoded = verifier.verify(token);

        UserDto user = authService.findByLogin(decoded.getIssuer());

        return new UsernamePasswordAuthenticationToken(
                user,
                null,
                user.getRoles().stream()
                        .map(SimpleGrantedAuthority::new).collect(Collectors.toSet())
        );
    }
}
