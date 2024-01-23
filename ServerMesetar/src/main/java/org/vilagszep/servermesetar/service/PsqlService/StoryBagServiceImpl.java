package org.vilagszep.servermesetar.service.PsqlService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.vilagszep.servermesetar.data.StoryBag;
import org.vilagszep.servermesetar.data.dto.story.helper.StoryBagDto;
import org.vilagszep.servermesetar.repository.StoryBagRepository;
import org.vilagszep.servermesetar.service.StoryBagService;

import java.util.List;

//this object is a service for story bag requests
@Service
@RequiredArgsConstructor
public class StoryBagServiceImpl implements StoryBagService {

    //bean
    private final StoryBagRepository storyBagRepository;
    private final static String NO_ELEMENT = "THIS_IS_FOR_ALL_ENTITIES";

    //this method will return all the elements, except  'NO_ELEMENT'
    @Override
    public List<StoryBagDto> getAll() {
        return storyBagRepository.findAllByElementIsNotOrderByElementAsc(NO_ELEMENT).stream().map(storyBag -> StoryBagDto.builder()
                .element(storyBag.getElement())
                .publicId(storyBag.getPublicId())
                .build()
        ).toList();
    }

    //this method will add a new element to the database
    @Override
    public StoryBagDto createStorybag(StoryBagDto storyBagDto) {
        StoryBag storyBag = storyBagRepository.save(StoryBag.builder().element(storyBagDto.getElement()).build());

        return StoryBagDto.builder().publicId(storyBagDto.getPublicId()).element(storyBag.getElement()).build();
    }
}
