package org.vilagszep.servermesetar.data.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class KeyWordDto {
    private String publicId;

    private String keyWord;


}
