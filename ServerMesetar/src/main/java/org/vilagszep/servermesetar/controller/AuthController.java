package org.vilagszep.servermesetar.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.vilagszep.servermesetar.data.dto.user.RegisterDto;
import org.vilagszep.servermesetar.security.UserAuthProvider;
import org.vilagszep.servermesetar.data.dto.user.LoginDto;
import org.vilagszep.servermesetar.data.dto.user.UserDto;
import org.vilagszep.servermesetar.service.AuthService;

import java.net.URI;

//this object is for receiving http requests for login and register
//only users with ADMIN role can send requests to endpoints that have admin in them
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    //beans
    private final AuthService authService;
    private final UserAuthProvider userAuthProvider;

    //this method is for logging in
    @PreAuthorize("permitAll()")
    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody LoginDto credentialsDTO) {

        UserDto user = authService.login(credentialsDTO);
        user.setToken(userAuthProvider.createToken(user.getLogin()));

        return ResponseEntity.ok(user);
    }

    //this method is for users with admin role, to register new users
    @PostMapping("/admin/register")
    public ResponseEntity<UserDto> registerUser(@RequestBody RegisterDto signUpDTO) {
        UserDto user = authService.register(signUpDTO);
        return ResponseEntity.created(URI.create("/users/" + user.getLogin()))
                .body(user);
    }

}
