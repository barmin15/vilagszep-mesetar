package org.vilagszep.servermesetar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.vilagszep.servermesetar.data.User;

import java.util.Optional;
import java.util.Set;

//this repository is for communication with the database for the given table
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Set<User> findAllByLoginNot(String login);
    Optional<User> findByLogin(String login);

    void deleteByPublicId(String publicId);

    Optional<User> findByPublicId(String publicId);
}
