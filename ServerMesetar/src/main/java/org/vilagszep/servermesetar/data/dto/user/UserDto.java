package org.vilagszep.servermesetar.data.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;
import java.util.UUID;

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
