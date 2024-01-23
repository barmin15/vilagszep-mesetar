package org.vilagszep.servermesetar.data.dto.user;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//this object is for sending and receiving Json data from the client
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class RegisterDto {
    private String login;
    private String password;
    private String role;
}
