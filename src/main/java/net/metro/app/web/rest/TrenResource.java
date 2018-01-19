package net.metro.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import net.metro.app.domain.Tren;

import net.metro.app.repository.TrenRepository;
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
 * REST controller for managing Tren.
 */
@RestController
@RequestMapping("/api")
public class TrenResource {

    private final Logger log = LoggerFactory.getLogger(TrenResource.class);

    private static final String ENTITY_NAME = "tren";

    private final TrenRepository trenRepository;

    public TrenResource(TrenRepository trenRepository) {
        this.trenRepository = trenRepository;
    }

    /**
     * POST  /trens : Create a new tren.
     *
     * @param tren the tren to create
     * @return the ResponseEntity with status 201 (Created) and with body the new tren, or with status 400 (Bad Request) if the tren has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/trens")
    @Timed
    public ResponseEntity<Tren> createTren(@RequestBody Tren tren) throws URISyntaxException {
        log.debug("REST request to save Tren : {}", tren);
        if (tren.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new tren cannot already have an ID")).body(null);
        }
        Tren result = trenRepository.save(tren);
        return ResponseEntity.created(new URI("/api/trens/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /trens : Updates an existing tren.
     *
     * @param tren the tren to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated tren,
     * or with status 400 (Bad Request) if the tren is not valid,
     * or with status 500 (Internal Server Error) if the tren couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/trens")
    @Timed
    public ResponseEntity<Tren> updateTren(@RequestBody Tren tren) throws URISyntaxException {
        log.debug("REST request to update Tren : {}", tren);
        if (tren.getId() == null) {
            return createTren(tren);
        }
        Tren result = trenRepository.save(tren);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, tren.getId().toString()))
            .body(result);
    }

    /**
     * GET  /trens : get all the trens.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of trens in body
     */
    @GetMapping("/trens")
    @Timed
    public List<Tren> getAllTrens() {
        log.debug("REST request to get all Trens");
        return trenRepository.findAll();
        }

    /**
     * GET  /trens/:id : get the "id" tren.
     *
     * @param id the id of the tren to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the tren, or with status 404 (Not Found)
     */
    @GetMapping("/trens/{id}")
    @Timed
    public ResponseEntity<Tren> getTren(@PathVariable Long id) {
        log.debug("REST request to get Tren : {}", id);
        Tren tren = trenRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(tren));
    }

    /**
     * DELETE  /trens/:id : delete the "id" tren.
     *
     * @param id the id of the tren to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/trens/{id}")
    @Timed
    public ResponseEntity<Void> deleteTren(@PathVariable Long id) {
        log.debug("REST request to delete Tren : {}", id);
        trenRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
