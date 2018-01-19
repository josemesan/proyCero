package net.metro.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import net.metro.app.domain.Fecha;

import net.metro.app.repository.FechaRepository;
import net.metro.app.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Fecha.
 */
@RestController
@RequestMapping("/api")
public class FechaResource {

    private final Logger log = LoggerFactory.getLogger(FechaResource.class);

    private static final String ENTITY_NAME = "fecha";

    private final FechaRepository fechaRepository;

    public FechaResource(FechaRepository fechaRepository) {
        this.fechaRepository = fechaRepository;
    }

    /**
     * POST  /fechas : Create a new fecha.
     *
     * @param fecha the fecha to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fecha, or with status 400 (Bad Request) if the fecha has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/fechas")
    @Timed
    public ResponseEntity<Fecha> createFecha(@RequestBody Fecha fecha) throws URISyntaxException {
        log.debug("REST request to save Fecha : {}", fecha);
        if (fecha.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new fecha cannot already have an ID")).body(null);
        }
        Fecha result = fechaRepository.save(fecha);
        return ResponseEntity.created(new URI("/api/fechas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /fechas : Updates an existing fecha.
     *
     * @param fecha the fecha to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fecha,
     * or with status 400 (Bad Request) if the fecha is not valid,
     * or with status 500 (Internal Server Error) if the fecha couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/fechas")
    @Timed
    public ResponseEntity<Fecha> updateFecha(@RequestBody Fecha fecha) throws URISyntaxException {
        log.debug("REST request to update Fecha : {}", fecha);
        if (fecha.getId() == null) {
            return createFecha(fecha);
        }
        Fecha result = fechaRepository.save(fecha);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fecha.getId().toString()))
            .body(result);
    }

    /**
     * GET  /fechas : get all the fechas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of fechas in body
     */
    @GetMapping("/fechas")
    @Timed
    public List<Fecha> getAllFechas() {
        log.debug("REST request to get all Fechas");
        return fechaRepository.findAll();
        }

    /**
     * GET  /fechas/:id : get the "id" fecha.
     *
     * @param id the id of the fecha to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fecha, or with status 404 (Not Found)
     */
    @GetMapping("/fechas/{id}")
    @Timed
    public ResponseEntity<Fecha> getFecha(@PathVariable Long id) {
        log.debug("REST request to get Fecha : {}", id);
        Fecha fecha = fechaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(fecha));
    }

    /**
     * DELETE  /fechas/:id : delete the "id" fecha.
     *
     * @param id the id of the fecha to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/fechas/{id}")
    @Timed
    public ResponseEntity<Void> deleteFecha(@PathVariable Long id) {
        log.debug("REST request to delete Fecha : {}", id);
        fechaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
