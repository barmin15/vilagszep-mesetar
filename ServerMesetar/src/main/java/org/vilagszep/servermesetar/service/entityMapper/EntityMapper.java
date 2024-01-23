package org.vilagszep.servermesetar.service.entityMapper;

import org.springframework.stereotype.Component;
import org.vilagszep.servermesetar.data.Story;
import org.vilagszep.servermesetar.data.dto.story.StoryDto;
import org.vilagszep.servermesetar.data.dto.story.helper.CountryDto;
import org.vilagszep.servermesetar.data.dto.story.helper.KeyWordDto;
import org.vilagszep.servermesetar.data.dto.story.helper.StoryBagDto;

import java.util.stream.Collectors;

//this object is to map entities to dto form
@Component
public class EntityMapper {
    private final static String NO_ELEMENT = "THIS_IS_FOR_ALL_ENTITIES";

    //this method will map a story entity received as parameter to Dto form
    public StoryDto mapStoryToDto(Story story){
        return StoryDto.builder()
                .publicId(story.getPublicId())
                .title(story.getTitle())
                .continent(story.getContinent())
                .source(story.getSource())
                .comment(story.getComment())
                .copyRight(story.getCopyRight())
                .ageGroup(story.getAgeGroup())
                .text(story.getText())
                .storyBags(story.getStoryBags()
                        .stream().filter(storyBag -> !storyBag.getElement().equals(NO_ELEMENT))
                        .map(currentStorybag -> StoryBagDto.builder()
                                .publicId(currentStorybag.getPublicId())
                                .element(currentStorybag.getElement())
                                .build()).collect(Collectors.toSet()))
                .keyWords(story.getKeyWords()
                        .stream().filter(keyWord -> !keyWord.getElement().equals(NO_ELEMENT))
                        .map(currentKeyWord -> KeyWordDto.builder()
                                .publicId(currentKeyWord.getPublicId())
                                .element(currentKeyWord.getElement())
                                .build()).collect(Collectors.toSet()))
                .countries(story.getCountries()
                        .stream().filter(country -> !country.getElement().equals(NO_ELEMENT))
                        .map(currentCountry -> CountryDto.builder()
                                .publicId(currentCountry.getPublicId())
                                .element(currentCountry.getElement())
                                .build()).collect(Collectors.toSet()))
                .build();
    }
}
