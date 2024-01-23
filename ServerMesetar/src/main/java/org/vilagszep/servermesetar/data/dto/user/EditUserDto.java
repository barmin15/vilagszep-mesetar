package org.vilagszep.servermesetar.data.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.vilagszep.servermesetar.security.UserRole;

import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class EditUserDto {
   private String login;
   private int numberOfFavouriteStories;
   private String role;
   private String publicId;
}
