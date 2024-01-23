package org.vilagszep.servermesetar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.vilagszep.servermesetar.data.Country;
import org.vilagszep.servermesetar.data.KeyWord;
import org.vilagszep.servermesetar.data.Story;
import org.vilagszep.servermesetar.data.StoryBag;
import org.vilagszep.servermesetar.data.dto.story.StoryDto;
import org.vilagszep.servermesetar.data.entityEnum.AgeGroup;
import org.vilagszep.servermesetar.data.entityEnum.Continent;
import org.vilagszep.servermesetar.data.entityEnum.CopyRight;

import java.util.List;
import java.util.Optional;
import java.util.Set;

//this repository is for communication with the database for the given table
@Repository
public interface StoryRepository extends JpaRepository<Story, Long> {

    Optional<Story> findByPublicId(String publicId);

    @Query("SELECT s.title FROM stories s")
    Set<String> findAllTitles();

    void deleteByPublicId(String publicId);

    Set<Story> findAllByKeyWordsIsInAndCountriesIsInAndStoryBagsIsInAndCopyRightIsInAndAgeGroupIsInAndContinentIsInAndTitleContainingIgnoreCaseOrKeyWordsIsInAndCountriesIsInAndStoryBagsIsInAndCopyRightIsInAndAgeGroupIsInAndContinentIsInAndTextContainingIgnoreCase(
            List<KeyWord> keyWords,
            List<Country> countries,
            List<StoryBag> storyBags,
            List<CopyRight> copyRights,
            List<AgeGroup> ageGroups,
            List<Continent> continents,
            String title,
            List<KeyWord> keyWords2,
            List<Country> countries2,
            List<StoryBag> storyBags2,
            List<CopyRight> copyRights2,
            List<AgeGroup> ageGroups2,
            List<Continent> continents2,
            String text);



}
