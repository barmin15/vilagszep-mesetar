package org.vilagszep.servermesetar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.vilagszep.servermesetar.data.Country;

@Repository
public interface CountryCultureRepository extends JpaRepository<Country, Long> {
}
