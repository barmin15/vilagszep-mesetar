package org.vilagszep.servermesetar.service;

import org.springframework.stereotype.Service;
import org.vilagszep.servermesetar.data.dto.story.StoryDto;
import org.vilagszep.servermesetar.data.dto.user.EditUserDto;
import org.vilagszep.servermesetar.data.dto.user.RegisterDto;

import java.util.Set;

//this is an interface for a service. In case you want to add a new database, you can implement this
@Service
public interface UserService {
    Set<EditUserDto> getAllUsers();

    EditUserDto getUserByPublicId(String publicId);

    Set<StoryDto> getLikedStories(String publicId);

    void likeOrDislikeStory(String storyPublicId, String userPublicId);

    EditUserDto editUser(String publicId, RegisterDto signupDto);

    void deleteUser(String publicId);
}
