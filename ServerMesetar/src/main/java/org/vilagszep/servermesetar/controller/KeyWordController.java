package org.vilagszep.servermesetar.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.vilagszep.servermesetar.data.dto.story.StoryDto;
import org.vilagszep.servermesetar.data.dto.story.helper.KeyWordDto;
import org.vilagszep.servermesetar.service.KeyWordService;

import java.util.List;
import java.util.Set;

//this object is for receiving http requests for anything related to the keyWords stored in the database
//only users with ADMIN role can send requests to endpoints that have admin in them
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/keyWord")
public class KeyWordController {
    //beans
    private final KeyWordService keyWordService;

    //this function will return all the keyWords from the database
    @GetMapping()
    public List<KeyWordDto> getAll() {
        return keyWordService.getAll();
    }

    //this function will insert new keyWords into the database
    @PostMapping("/admin/add")
    public KeyWordDto addKeyWord(@RequestBody KeyWordDto keyWordDto){
        return keyWordService.addKeyWord(keyWordDto);
    }
}
