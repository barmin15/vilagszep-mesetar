package org.vilagszep.servermesetar.service.PsqlService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.vilagszep.servermesetar.data.Story;
import org.vilagszep.servermesetar.data.User;
import org.vilagszep.servermesetar.data.dto.story.StoryDto;
import org.vilagszep.servermesetar.data.dto.user.EditUserDto;
import org.vilagszep.servermesetar.data.dto.user.RegisterDto;
import org.vilagszep.servermesetar.exception.AppException;
import org.vilagszep.servermesetar.repository.StoryRepository;
import org.vilagszep.servermesetar.repository.UserRepository;
import org.vilagszep.servermesetar.security.UserRole;
import org.vilagszep.servermesetar.service.UserService;
import org.vilagszep.servermesetar.service.entityMapper.EntityMapper;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

//this object is a service for user requests
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    //beans
    private final UserRepository userRepository;
    private final StoryRepository storyRepository;
    private final PasswordEncoder passwordEncoder;
    private final EntityMapper entityMapper;

    //this method returns all the users from the database
    @Transactional
    @Override
    public Set<EditUserDto> getAllUsers() {
        //we do not return the admin as it can not be changed
        Set<User> users = userRepository.findAllByLoginNot("admin");

        return users.stream()
                .map(user -> EditUserDto.builder()
                        .login(user.getLogin())
                        .numberOfFavouriteStories(user.getFavouriteStories().size())
                        .role(user.getRole().name())
                        .publicId(user.getPublicId())
                        .build()).collect(Collectors.toSet());
    }

    //this method return the selected user from the database via public id
    @Transactional
    @Override
    public EditUserDto getUserByPublicId(String publicId) {
        User user = userRepository.findByPublicId(publicId)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        return EditUserDto.builder().login(user.getLogin()).role(user.getRole().name()).build();
    }

    //this method return all the liked stories for the selected user
    @Transactional
    @Override
    public Set<StoryDto> getLikedStories(String publicId) {
        User user = userRepository.findByPublicId(publicId)
                .orElseThrow(() -> new AppException("Unknown User", HttpStatus.NOT_FOUND));

        return user.getFavouriteStories() != null ? user.getFavouriteStories()
                .stream().map(entityMapper::mapStoryToDto).collect(Collectors.toSet())
                //if user has no liked stories, we return an empty set
                : new HashSet<>();
    }

    //this method edits and returns the selected user
    @Transactional
    @Override
    public EditUserDto editUser(String publicId, RegisterDto signupDto) {

        User user = userRepository.findByPublicId(publicId)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        user.setLogin(signupDto.getLogin() != null ? signupDto.getLogin() : user.getLogin());
        user.setRole(signupDto.getRole().equals("USER") ? UserRole.USER : UserRole.ADMIN);
        user.setPassword(signupDto.getPassword() != null ? passwordEncoder.encode(signupDto.getPassword()) : user.getPassword());

        User saved = userRepository.save(user);

        return EditUserDto.builder()
                .role(saved.getRole().name())
                .login(saved.getLogin())
                .publicId(saved.getPublicId())
                .build();
    }

    @Transactional
    @Override
    public void likeOrDislikeStory(String storyPublicId, String userPublicId) {
        Story story = storyRepository.findByPublicId(storyPublicId)
                .orElseThrow(() -> new AppException("Unknown story", HttpStatus.NOT_FOUND));

        User user = userRepository.findByPublicId(userPublicId)
                .orElseThrow(() -> new AppException("Unknown User", HttpStatus.NOT_FOUND));
        if (user.getFavouriteStories() == null || !user.getFavouriteStories().contains(story)) {
            user.addLikedStory(story);
        } else {
            user.getFavouriteStories().remove(story);
        }

        userRepository.save(user);
        storyRepository.save(story);
    }

    @Transactional
    @Override
    public void deleteUser(String publicId) {
        User admin = userRepository.findByLogin("admin")
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        if (!publicId.equals(admin.getPublicId())) userRepository.deleteByPublicId(publicId);
    }


}
