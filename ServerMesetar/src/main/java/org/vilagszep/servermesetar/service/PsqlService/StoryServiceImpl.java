package org.vilagszep.servermesetar.service.PsqlService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.vilagszep.servermesetar.data.*;
import org.vilagszep.servermesetar.data.dto.story.RegisterStoryDto;
import org.vilagszep.servermesetar.data.dto.story.StoryDto;
import org.vilagszep.servermesetar.exception.AppException;
import org.vilagszep.servermesetar.repository.*;
import org.vilagszep.servermesetar.service.PsqlService.filter.StoryFilter;
import org.vilagszep.servermesetar.service.StoryService;
import org.vilagszep.servermesetar.service.entityMapper.EntityMapper;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

//this object is a service for story requests
@Service
@RequiredArgsConstructor
public class StoryServiceImpl implements StoryService {
    //beans
    private final StoryRepository storyRepository;
    private final StoryBagRepository storyBagRepository;
    private final CountryRepository countryRepository;
    private final KeyWordRepository keyWordRepository;
    private final StoryFilter storyFilter;
    private final EntityMapper entityMapper;
    private final static String NO_ELEMENT = "THIS_IS_FOR_ALL_ENTITIES";

    //this method returns all stories
    @Transactional
    @Override
    public Set<StoryDto> getAll() {
        return storyRepository.findAll().stream().map(entityMapper::mapStoryToDto).collect(Collectors.toSet());
    }

    //this method returns all story titles
    @Transactional
    @Override
    public Set<String> getAllStoryTitles() {
        return storyRepository.findAllTitles();
    }

    //this method return a story to be edited via public id received in parameter
    @Transactional
    @Override
    public StoryDto getStoryForEdit(String publicId) {
        Story story = storyRepository.findByPublicId(publicId)
                .orElseThrow(() -> new AppException("Unknown Story", HttpStatus.NOT_FOUND));

        return entityMapper.mapStoryToDto(story);
    }

    //this method return the selected story via public id
    @Transactional
    @Override
    public StoryDto getStoryByPublicId(String storyPublicId, String userPublicId) {
        Story story = storyRepository.findByPublicId(storyPublicId)
                .orElseThrow(() -> new AppException("Unknown story", HttpStatus.NOT_FOUND));

        StoryDto storyDto = entityMapper.mapStoryToDto(story);
        storyDto.setLiked(story.getUsersWhoLiked().stream().map(User::getPublicId).collect(Collectors.toSet()).contains(userPublicId));

        return storyDto;
    }

    //this method returns the filtered stories
    //this method uses the story filter component
    @Transactional
    @Override
    public Set<StoryDto> getFilteredStories(String keyWord, String country, String storyBag, String ageGroup, String continent, String copyRight, String search) {
        return storyRepository.findAllByKeyWordsIsInAndCountriesIsInAndStoryBagsIsInAndCopyRightIsInAndAgeGroupIsInAndContinentIsInAndTitleContainingIgnoreCaseOrKeyWordsIsInAndCountriesIsInAndStoryBagsIsInAndCopyRightIsInAndAgeGroupIsInAndContinentIsInAndTextContainingIgnoreCase(
                        storyFilter.filterForKeyWord(keyWord),
                        storyFilter.filterForCountry(country),
                        storyFilter.filterForStoryBag(storyBag),
                        storyFilter.filterForCopyRight(copyRight),
                        storyFilter.filterForAgeGroup(ageGroup),
                        storyFilter.filterForContinent(continent),
                        search, storyFilter.filterForKeyWord(keyWord),
                        storyFilter.filterForCountry(country),
                        storyFilter.filterForStoryBag(storyBag),
                        storyFilter.filterForCopyRight(copyRight),
                        storyFilter.filterForAgeGroup(ageGroup),
                        storyFilter.filterForContinent(continent),
                        search)
                .stream().map(entityMapper::mapStoryToDto).collect(Collectors.toSet());
    }

    //this method creates a new story
    @Transactional
    @Override
    public StoryDto create(RegisterStoryDto registerStoryDto) {

        //collecting all the helper items for the story
        Set<String> storyBagStrings = new HashSet<>(List.of(NO_ELEMENT));
        Set<String> countryStrings = new HashSet<>(List.of(NO_ELEMENT));
        Set<String> keyWordStrings = new HashSet<>(List.of(NO_ELEMENT));

        storyBagStrings.addAll(registerStoryDto.getStoryBags());
        countryStrings.addAll(registerStoryDto.getCountries());
        keyWordStrings.addAll(registerStoryDto.getKeyWords());

        //getting all the helper elements from the database
        Set<StoryBag> storyBags = storyBagRepository.findAllByElementIsIn(storyBagStrings);
        Set<Country> countries = countryRepository.findAllByElementIsIn(countryStrings);
        Set<KeyWord> keyWords = keyWordRepository.findAllByElementIsIn(keyWordStrings);

        //saving the story
        Story story = storyRepository.save(Story.builder()
                .title(registerStoryDto.getTitle())
                .comment(registerStoryDto.getComment())
                .source(registerStoryDto.getSource())
                .copyRight(registerStoryDto.getCopyRight())
                .ageGroup(registerStoryDto.getAgeGroup())
                .continent(registerStoryDto.getContinent())
                .text(registerStoryDto.getText())
                .storyBags(storyBags)
                .countries(countries)
                .keyWords(keyWords)
                .build());

        return entityMapper.mapStoryToDto(story);
    }

    //this method updates the selected story via public id
    @Transactional
    @Override
    public StoryDto updateStoryByPublicId(String publicId, RegisterStoryDto storyDto) {
        Story story = storyRepository.findByPublicId(publicId)
                .orElseThrow(() -> new AppException("Unknown Story", HttpStatus.NOT_FOUND));

        //collecting all the helper elements
        Set<String> storyBagStrings = new HashSet<>(List.of(NO_ELEMENT));
        Set<String> countryStrings = new HashSet<>(List.of(NO_ELEMENT));
        Set<String> keyWordStrings = new HashSet<>(List.of(NO_ELEMENT));

        storyBagStrings.addAll(storyDto.getStoryBags());
        countryStrings.addAll(storyDto.getCountries());
        keyWordStrings.addAll(storyDto.getKeyWords());

        //getting all helper elements from the database
        Set<StoryBag> storyBags = storyBagRepository.findAllByElementIsIn(storyBagStrings);
        Set<Country> countries = countryRepository.findAllByElementIsIn(countryStrings);
        Set<KeyWord> keyWords = keyWordRepository.findAllByElementIsIn(keyWordStrings);

        story.setAgeGroup(storyDto.getAgeGroup());
        story.setContinent(storyDto.getContinent());
        story.setComment(storyDto.getComment());
        story.setStoryBags(storyBags);
        story.setCountries(countries);
        story.setText(storyDto.getText());
        story.setSource(storyDto.getSource());
        story.setTitle(storyDto.getTitle());
        story.setCopyRight(storyDto.getCopyRight());
        story.setKeyWords(keyWords);

        return entityMapper.mapStoryToDto(story);
    }

    //this method deletes the selected story from the database via public id
    @Transactional
    @Override
    public void deleteStoryByPublicId(String publicId) {
        storyRepository.deleteByPublicId(publicId);
    }
}
