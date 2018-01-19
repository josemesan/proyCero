package net.metro.app.repository;

import net.metro.app.domain.TablaTrenes;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TablaTrenes entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TablaTrenesRepository extends JpaRepository<TablaTrenes, Long> {

}
