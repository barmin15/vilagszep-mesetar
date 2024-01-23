package org.vilagszep.servermesetar.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.vilagszep.servermesetar.data.dto.story.StoryDto;
import org.vilagszep.servermesetar.data.dto.user.EditUserDto;
import org.vilagszep.servermesetar.data.dto.user.RegisterDto;
import org.vilagszep.servermesetar.data.dto.user.UserDto;
import org.vilagszep.servermesetar.service.UserService;

import java.util.Set;

//this object will handle all the http requests for users from the client
//all endpoints that have admin in the can only be accessed by users with ADMIN role
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/user")
public class UserController {

    //bean
    private final UserService userService;

    //this method will return all the users
    @GetMapping("/admin")
    public Set<EditUserDto> getAllUsers() {
        return userService.getAllUsers();
    }

    //this method will return the user about to be edited via public id to the client
    @GetMapping("/admin/{publicId}")
    public EditUserDto editUser(@PathVariable String publicId) {
        return userService.getUserByPublicId(publicId);
    }

    //this method will return all the users liked stories via the users public id
    @GetMapping("/likedStories/{publicId}")
    public Set<StoryDto> getLikedStories(@PathVariable String publicId){
        return userService.getLikedStories(publicId);
    }

    //this method will insert the new data of the user to the database via publicId
    @PostMapping("/admin/{publicId}")
    public EditUserDto editUser(@PathVariable String publicId, @RequestBody RegisterDto signupDto) {
        return userService.editUser(publicId, signupDto);
    }

    //this method will either like or dislike a story via the user's and the story's public id
    @PostMapping("/likeStory/{storyPublicId}/{userPublicId}")
    public void likeOrDislikeStory(@PathVariable String storyPublicId, @PathVariable String userPublicId) {
        userService.likeOrDislikeStory(storyPublicId, userPublicId);
    }

    //this method will delete the user from the database via the deletable user's public id
    @DeleteMapping("/admin/{publicId}")
    public void deleteUser(@PathVariable String publicId) {
        userService.deleteUser(publicId);
    }

}
