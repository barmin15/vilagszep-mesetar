package org.vilagszep.servermesetar.service.PsqlService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.vilagszep.servermesetar.data.User;
import org.vilagszep.servermesetar.data.dto.user.LoginDto;
import org.vilagszep.servermesetar.data.dto.user.RegisterDto;
import org.vilagszep.servermesetar.data.dto.user.UserDto;
import org.vilagszep.servermesetar.exception.AppException;
import org.vilagszep.servermesetar.repository.UserRepository;
import org.vilagszep.servermesetar.security.UserRole;
import org.vilagszep.servermesetar.service.AuthService;

import java.nio.CharBuffer;
import java.util.*;

//this object is a service for authentication requests
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    //beans
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    //this method will find and return a user via login
    @Override
    public UserDto findByLogin(String login) {
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        return UserDto.builder()
                .login(user.getLogin())
                .role(user.getRole().name())
                .build();
    }

    //this method will register and return a newly created user
    @Override
    public UserDto register(RegisterDto userDTO) {
        Optional<User> optionalUser = userRepository.findByLogin(userDTO.getLogin());

        //checking if user with this login is already created
        if (optionalUser.isPresent()) {
            throw new AppException("Already a user", HttpStatus.BAD_REQUEST);
        }

        User user = User.builder()
                .login(userDTO.getLogin())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .build();

        //setting the right role for the user
        if (userDTO.getRole().equals(UserRole.ADMIN.name())) {
            user.setRole(UserRole.ADMIN);
        } else {
            user.setRole(UserRole.USER);
        }

        user = userRepository.save(user);

        return UserDto.builder()
                .login(user.getLogin())
                .role(user.getRole().name())
                .build();

    }

    //this method 'log in' check if a user has valid password when logging in
    @Override
    public UserDto login(LoginDto credentialsDTO) {
        User user = userRepository.findByLogin(credentialsDTO.getLogin())
                .orElseThrow(() -> new AppException("Unknown User", HttpStatus.NOT_FOUND));

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDTO.getPassword()), user.getPassword())) {
            //return user if authentication is valid
            return UserDto.builder()
                    .login(user.getLogin())
                    .publicId(user.getPublicId())
                    .role(user.getRole().name())
                    .build();
        }

        //throw error if password is not valid
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

}
