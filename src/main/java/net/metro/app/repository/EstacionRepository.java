package net.metro.app.repository;

import net.metro.app.domain.Estacion;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Estacion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstacionRepository extends JpaRepository<Estacion, Long> {

}
