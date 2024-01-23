package org.vilagszep.servermesetar.service;

import org.springframework.stereotype.Service;
import org.vilagszep.servermesetar.data.dto.user.LoginDto;
import org.vilagszep.servermesetar.data.dto.user.RegisterDto;
import org.vilagszep.servermesetar.data.dto.user.UserDto;

//this is an interface for a service. In case you want to add a new database, you can implement this
@Service
public interface AuthService {
    UserDto findByLogin(String issuer);

    UserDto register(RegisterDto signUpDTO);

    UserDto login(LoginDto credentialsDTO);
}
