package org.vilagszep.servermesetar.controller;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.vilagszep.servermesetar.data.dto.story.RegisterStoryDto;
import org.vilagszep.servermesetar.data.dto.story.StoryDto;
import org.vilagszep.servermesetar.service.StoryService;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

//this object is for receiving and returning http requests for stories from the client
//only users with ADMIN role can send requests to endpoints that have admin in them
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/story")
public class StoryController {

    //bean
    private final StoryService storyService;

    //this method will return all the stories from the database
    @GetMapping("/admin")
    public Set<StoryDto> getAllStories() {
        return storyService.getAll();
    }

    //this method will return all story titles from the database
    @GetMapping("/titles")
    public Set<String> getAllStoryTitles() {
        return storyService.getAllStoryTitles();
    }

   //this method will return the story by public id, for editing to the client
    @GetMapping("/admin/{publicId}")
    public StoryDto getStoryForEdit(@PathVariable String publicId) {
        return storyService.getStoryForEdit(publicId);
    }

    //this method will return the story with the public id from the endpoint
    @GetMapping("/{storyPublicId}/{userPublicId}")
    public StoryDto getStoryByPublicId(@PathVariable String storyPublicId, @PathVariable String userPublicId) {
        return storyService.getStoryByPublicId(storyPublicId, userPublicId);
    }

    //this method will return the filtered stories to the client
    //all the info for filtering is available from the path
    @GetMapping(
            "/filter/keyWord={keyWord}/country={country}/storyBag={storyBag}/ageGroup={ageGroup}/continent={continent}/copyRight={copyRight}/search={search}")
    public Set<StoryDto> getFilteredStories(
            @PathVariable String keyWord,
            @PathVariable String country,
            @PathVariable String storyBag,
            @PathVariable String ageGroup,
            @PathVariable String continent,
            @PathVariable String copyRight,
            @PathVariable String search) {
        //if the search field from the path is 'all', the server will return all
        return search.equals("all") ? storyService.getFilteredStories(keyWord, country, storyBag, ageGroup, continent, copyRight, "")
                : storyService.getFilteredStories(keyWord, country, storyBag, ageGroup, continent, copyRight, search);
    }

    //this method will insert a new story into the database
    @PostMapping("/admin/create")
    public StoryDto createStory(@RequestBody RegisterStoryDto registerStoryDto) {
        return storyService.create(registerStoryDto);
    }

    //this method will insert the new data for a story in the database
    @PutMapping("/admin/{publicId}")
    public StoryDto updateStory(@PathVariable String publicId, @RequestBody RegisterStoryDto storyDto) {
        return storyService.updateStoryByPublicId(publicId, storyDto);
    }

    //this method will delete a story via public id from the database
    @DeleteMapping("/admin/{publicId}")
    public void deleteStory(@PathVariable String publicId) {
        storyService.deleteStoryByPublicId(publicId);
    }

}
