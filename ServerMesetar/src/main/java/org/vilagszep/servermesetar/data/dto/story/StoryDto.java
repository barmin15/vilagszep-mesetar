package org.vilagszep.servermesetar.data.dto.story;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.vilagszep.servermesetar.data.dto.story.helper.CountryDto;
import org.vilagszep.servermesetar.data.dto.story.helper.KeyWordDto;
import org.vilagszep.servermesetar.data.dto.story.helper.StoryBagDto;
import org.vilagszep.servermesetar.data.entityEnum.AgeGroup;
import org.vilagszep.servermesetar.data.entityEnum.Continent;
import org.vilagszep.servermesetar.data.entityEnum.CopyRight;

import java.util.Set;

//this object is for sending and receiving Json data from the client
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class StoryDto {
    private String publicId;

    private String title;

    private Continent continent;

    private String source;

    private String comment;

    private String text;

    private AgeGroup ageGroup;

    private Set<CountryDto> countries;

    private Set<StoryBagDto> storyBags;

    private Set<KeyWordDto> keyWords;

    private CopyRight copyRight;

    private boolean isLiked;
}
