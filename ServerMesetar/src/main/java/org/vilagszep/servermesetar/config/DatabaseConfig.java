package org.vilagszep.servermesetar.config;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.vilagszep.servermesetar.controller.AuthController;
import org.vilagszep.servermesetar.data.Country;
import org.vilagszep.servermesetar.data.KeyWord;
import org.vilagszep.servermesetar.data.Story;
import org.vilagszep.servermesetar.data.StoryBag;
import org.vilagszep.servermesetar.data.dto.user.RegisterDto;
import org.vilagszep.servermesetar.data.entityEnum.AgeGroup;
import org.vilagszep.servermesetar.data.entityEnum.Continent;
import org.vilagszep.servermesetar.data.entityEnum.CopyRight;
import org.vilagszep.servermesetar.repository.*;
import org.vilagszep.servermesetar.security.UserRole;

import java.util.*;

//this class is for creating and adding elements to the database, before the server starts running
@Component
@RequiredArgsConstructor
public class DatabaseConfig {
    //beans
    private final UserRepository userRepository;
    private final AuthController authController;
    private final KeyWordRepository keyWordRepository;
    private final StoryBagRepository storyBagRepository;
    private final CountryRepository countryRepository;
    private final static String NO_ELEMENT = "THIS_IS_FOR_ALL_ENTITIES";

    //this function will create adn admin user, if it's not already in the database
    @Transactional
    public void createAdmin() {
        String login = "admin";
        String password = "admin";

        if (!userRepository.findByLogin(login).isPresent()) {
            RegisterDto registerDto = RegisterDto.builder().login(login).password(password).role(UserRole.ADMIN.name()).build();

            authController.registerUser(registerDto);
        }
    }

    //this method will create elements, for even those stories, that have no elements, so you can search for them
    @Transactional
    public void createNoElementExceptionForStories() {
        if (!storyBagRepository.existsByElement(NO_ELEMENT))
            storyBagRepository.save(StoryBag.builder().element(NO_ELEMENT).build());

        if (!countryRepository.existsByElement(NO_ELEMENT))
            countryRepository.save(Country.builder().element(NO_ELEMENT).build());

        if (!keyWordRepository.existsByElement(NO_ELEMENT))
            keyWordRepository.save(KeyWord.builder().element(NO_ELEMENT).build());
    }
}
