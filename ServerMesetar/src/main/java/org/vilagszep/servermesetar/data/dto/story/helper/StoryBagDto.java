package org.vilagszep.servermesetar.data.dto.story.helper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//this object is for sending and receiving Json data from the client
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class StoryBagDto {

    private String publicId;

    private String element;
}
