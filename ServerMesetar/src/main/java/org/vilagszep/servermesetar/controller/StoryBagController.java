package org.vilagszep.servermesetar.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.vilagszep.servermesetar.data.dto.story.helper.StoryBagDto;
import org.vilagszep.servermesetar.service.StoryBagService;

import java.util.List;

//this object is for receiving http requests for anything related to the storyBags stored in the database
//only users with ADMIN role can send requests to endpoints that have admin in them
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/storyBag")
public class StoryBagController {
    //beans
    private final StoryBagService storyBagService;

    //this function will return all storyBags from the database
    @GetMapping()
    public List<StoryBagDto> getAllStoryBags() {
        return storyBagService.getAll();
    }

    //this function will insert new storyBags to the database
    @PostMapping("/admin/add")
    public StoryBagDto addStoryBag(@RequestBody StoryBagDto storyBagDto) {
        return storyBagService.createStorybag(storyBagDto);
    }
}
