package org.vilagszep.servermesetar.data.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.vilagszep.servermesetar.data.KeyWord;

import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class StoryDto {
    private String publicId;

    private String title;

    private String origin;

    private String culture;

    private String region_continent;

    private String age_group;

    private Set<KeyWordDto> keyWords;

    private String copyRight;

    private Set<EditUserDto> usersWhoLiked;
}
