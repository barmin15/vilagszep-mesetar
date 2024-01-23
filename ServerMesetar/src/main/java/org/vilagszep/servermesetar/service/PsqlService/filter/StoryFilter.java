package org.vilagszep.servermesetar.service.PsqlService.filter;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.vilagszep.servermesetar.data.Country;
import org.vilagszep.servermesetar.data.KeyWord;
import org.vilagszep.servermesetar.data.StoryBag;
import org.vilagszep.servermesetar.data.entityEnum.AgeGroup;
import org.vilagszep.servermesetar.data.entityEnum.Continent;
import org.vilagszep.servermesetar.data.entityEnum.CopyRight;
import org.vilagszep.servermesetar.exception.AppException;
import org.vilagszep.servermesetar.repository.CountryRepository;
import org.vilagszep.servermesetar.repository.KeyWordRepository;
import org.vilagszep.servermesetar.repository.StoryBagRepository;

import java.util.*;

//this is a helper object for filtering stories
@Component
@RequiredArgsConstructor
public class StoryFilter {
    //beans
    private final StoryBagRepository storyBagRepository;
    private final CountryRepository countryRepository;
    private final KeyWordRepository keyWordRepository;

    //this method filters stories for keyword
    public List<KeyWord> filterForKeyWord(String elem) {
        if (elem.equals("all")) {
            //if parameter is 'all', we will return all elements
            return keyWordRepository.findAll();
        } else {
            KeyWord keyWord = keyWordRepository.findByElement(elem)
                    .orElseThrow(() -> new AppException("Keyword not found", HttpStatus.NOT_FOUND));
            return List.of(keyWord);
        }
    }

    //this method filters stories for countries
    public List<Country> filterForCountry(String elem) {
        if (elem.equals("all")) {
            //if parameter is 'all', we will return all elements
            return countryRepository.findAll();

        } else {
            Country country = countryRepository.findByElement(elem)
                    .orElseThrow(() -> new AppException("Country not found", HttpStatus.NOT_FOUND));
            return List.of(country);
        }
    }

    //this method filters stories for story bags
    public List<StoryBag> filterForStoryBag(String elem) {
        if (elem.equals("all")) {
            //if parameter is 'all', we will return all elements
            return storyBagRepository.findAll();

        } else {
            StoryBag storyBag = storyBagRepository.findByElement(elem)
                    .orElseThrow(() -> new AppException("StoryBag not found", HttpStatus.NOT_FOUND));
            return List.of(storyBag);
        }
    }

    //this method filters stories for age groups
    public List<AgeGroup> filterForAgeGroup(String elem) {
        if (elem.equals("all")) {
            //if parameter is 'all', we will return all elements
            return List.of(AgeGroup.values());
        } else {
            return Arrays.stream(AgeGroup.values()).filter(ageGroup -> ageGroup.isThisType(elem)).toList();
        }
    }

    //this method filters stories for continents
    public List<Continent> filterForContinent(String elem) {
        if (elem.equals("all")) {
            //if parameter is 'all', we will return all elements
            return List.of(Continent.values());
        } else {
            Continent continent = Arrays.stream(Continent.values()).filter(ageGroup -> ageGroup.isThisType(elem)).findAny().get();
            return List.of(continent);
        }
    }

    //this method filters stories for copyrights
    public List<CopyRight> filterForCopyRight(String elem) {
        if (elem.equals("all")) {
            //if parameter is 'all', we will return all elements
            return List.of(CopyRight.values());
        } else {
            CopyRight copyRight = Arrays.stream(CopyRight.values()).filter(ageGroup -> ageGroup.isThisType(elem)).findAny().get();

            return List.of(copyRight);
        }
    }

}
