package org.vilagszep.servermesetar.data.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;
import java.util.UUID;

//this object is for sending and receiving Json data from the client
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class UserDto {
    private String publicId;
    private String login;
    private String password;
    private String adminPassword;
    private String token;
    private String role;
}
