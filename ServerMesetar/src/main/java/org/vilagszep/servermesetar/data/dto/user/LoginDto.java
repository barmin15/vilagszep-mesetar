package org.vilagszep.servermesetar.data.dto.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

//this object is for sending and receiving Json data from the client
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class LoginDto {
    private String login;
    private String password;
}
