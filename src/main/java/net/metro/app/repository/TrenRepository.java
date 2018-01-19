package net.metro.app.repository;

import net.metro.app.domain.Tren;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Tren entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TrenRepository extends JpaRepository<Tren, Long> {

}
