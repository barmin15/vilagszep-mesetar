package org.vilagszep.servermesetar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.vilagszep.servermesetar.data.Country;
import org.vilagszep.servermesetar.data.KeyWord;

import java.util.List;
import java.util.Optional;
import java.util.Set;

//this repository is for communication with the database for the given table
@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {

    boolean existsByElement(String element);

    List<Country> findAllByElementIsNotOrderByElementAsc(String element);

    Optional<Country> findByElement(String element);

    Set<Country> findAllByElementIsIn(Set<String> countries);
}
