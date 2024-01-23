package org.vilagszep.servermesetar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.vilagszep.servermesetar.data.Country;
import org.vilagszep.servermesetar.data.KeyWord;
import org.vilagszep.servermesetar.data.StoryBag;

import java.util.List;
import java.util.Optional;
import java.util.Set;

//this repository is for communication with the database for the given table
@Repository
public interface StoryBagRepository extends JpaRepository<StoryBag, Long> {
    boolean existsByElement(String element);
    List<StoryBag> findAllByElementIsNotOrderByElementAsc(String element);
    Optional<StoryBag> findByElement(String element);
    Set<StoryBag> findAllByElementIsIn(Set<String> storyBags);
}
