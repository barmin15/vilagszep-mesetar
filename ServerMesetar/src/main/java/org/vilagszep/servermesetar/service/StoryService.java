package org.vilagszep.servermesetar.service;

import org.springframework.stereotype.Service;
import org.vilagszep.servermesetar.data.dto.story.RegisterStoryDto;
import org.vilagszep.servermesetar.data.dto.story.StoryDto;
import org.vilagszep.servermesetar.data.dto.user.RegisterDto;

import java.util.List;
import java.util.Set;

//this is an interface for a service. In case you want to add a new database, you can implement this
@Service
public interface StoryService {
    Set<StoryDto> getAll();

    Set<String> getAllStoryTitles();

    StoryDto getStoryForEdit(String publicId);

    StoryDto getStoryByPublicId(String StoryPublicId, String userPublicId);

    Set<StoryDto> getFilteredStories(String keyWord, String country, String storyBag, String ageGroup, String continent, String copyRight, String search);

    StoryDto create(RegisterStoryDto registerStoryDto);

    StoryDto updateStoryByPublicId(String publicId, RegisterStoryDto storyDto);

    void deleteStoryByPublicId(String publicId);

}
