package org.vilagszep.servermesetar.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.vilagszep.servermesetar.data.Country;
import org.vilagszep.servermesetar.data.KeyWord;
import org.vilagszep.servermesetar.data.Story;

import java.security.Key;
import java.util.List;
import java.util.Optional;
import java.util.Set;

//this repository is for communication with the database for the given table
@Repository
public interface KeyWordRepository extends JpaRepository<KeyWord, Long> {
    boolean existsByElement(String element);
    List<KeyWord> findAllByElementIsNotOrderByElementAsc(String element);
    Optional<KeyWord> findByElement(String element);

    Set<KeyWord> findByOrderByElementAsc();

    Set<KeyWord> findAllByPublicIdIsIn(Set<String> publicIds);

    Set<KeyWord> findAllByElementIsIn(Set<String> keyWords);
}
