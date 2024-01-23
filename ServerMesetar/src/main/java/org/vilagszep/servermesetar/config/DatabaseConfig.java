package org.vilagszep.servermesetar.config;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.vilagszep.servermesetar.controller.AuthController;
import org.vilagszep.servermesetar.data.KeyWord;
import org.vilagszep.servermesetar.data.User;
import org.vilagszep.servermesetar.data.dto.RegisterDto;
import org.vilagszep.servermesetar.exception.AppException;
import org.vilagszep.servermesetar.repository.KeyWordRepository;
import org.vilagszep.servermesetar.repository.UserRepository;

import java.util.*;

@Component
@RequiredArgsConstructor
public class DatabaseConfig {
    private final AuthController authController;
    private final KeyWordRepository keyWordRepository;

    private final List<String> keyWords = List.of("advent", "ajándék", "ajándékozás", "alászállás", "alkotás", "állatmese", "állatok", "állatok és emberek", "álmok", "álruha", "Ananszi", "anyák", "apák", "Arthur király", "átalakulás", "átváltozás", "átverés", "barátság", "bátorság", "becsületesség", "béke", "bezárkózás", "bizalom", "bőkezűség", "bölcsesség", "boldogság", "bőség", "boszorkányok", "célok elérése", "család", "családmodellek", "csalimese", "csapatmunka");

    @Transactional
    public void createAdmin() {
        String login = "admin";
        String password = "admin";

        RegisterDto registerDto = RegisterDto.builder().login(login).password(password).isAdmin(true).build();

        authController.register(registerDto);
    }

    public void insertKeyWords() {
        keyWords.forEach(keyWord -> keyWordRepository.save(KeyWord.builder().keyWord(keyWord).build()));
    }

}
