package org.vilagszep.servermesetar.service;

import org.springframework.stereotype.Service;
import org.vilagszep.servermesetar.data.dto.story.helper.StoryBagDto;

import java.util.List;

//this is an interface for a service. In case you want to add a new database, you can implement this
@Service
public interface StoryBagService {
    List<StoryBagDto> getAll();

    StoryBagDto createStorybag(StoryBagDto storyBagDto);
}
