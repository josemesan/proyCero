package net.metro.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import net.metro.app.domain.Linea;

import net.metro.app.repository.LineaRepository;
import net.metro.app.web.rest.util.HeaderUtil;
import net.metro.app.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Linea.
 */
@RestController
@RequestMapping("/api")
public class LineaResource {

    private final Logger log = LoggerFactory.getLogger(LineaResource.class);

    private static final String ENTITY_NAME = "linea";

    private final LineaRepository lineaRepository;

    public LineaResource(LineaRepository lineaRepository) {
        this.lineaRepository = lineaRepository;
    }

    /**
     * POST  /lineas : Create a new linea.
     *
     * @param linea the linea to create
     * @return the ResponseEntity with status 201 (Created) and with body the new linea, or with status 400 (Bad Request) if the linea has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/lineas")
    @Timed
    public ResponseEntity<Linea> createLinea(@RequestBody Linea linea) throws URISyntaxException {
        log.debug("REST request to save Linea : {}", linea);
        if (linea.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new linea cannot already have an ID")).body(null);
        }
        Linea result = lineaRepository.save(linea);
        return ResponseEntity.created(new URI("/api/lineas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /lineas : Updates an existing linea.
     *
     * @param linea the linea to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated linea,
     * or with status 400 (Bad Request) if the linea is not valid,
     * or with status 500 (Internal Server Error) if the linea couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/lineas")
    @Timed
    public ResponseEntity<Linea> updateLinea(@RequestBody Linea linea) throws URISyntaxException {
        log.debug("REST request to update Linea : {}", linea);
        if (linea.getId() == null) {
            return createLinea(linea);
        }
        Linea result = lineaRepository.save(linea);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, linea.getId().toString()))
            .body(result);
    }

    /**
     * GET  /lineas : get all the lineas.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of lineas in body
     */
    @GetMapping("/lineas")
    @Timed
    public ResponseEntity<List<Linea>> getAllLineas(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Lineas");
        Page<Linea> page = lineaRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/lineas");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /lineas/:id : get the "id" linea.
     *
     * @param id the id of the linea to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the linea, or with status 404 (Not Found)
     */
    @GetMapping("/lineas/{id}")
    @Timed
    public ResponseEntity<Linea> getLinea(@PathVariable Long id) {
        log.debug("REST request to get Linea : {}", id);
        Linea linea = lineaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(linea));
    }

    /**
     * DELETE  /lineas/:id : delete the "id" linea.
     *
     * @param id the id of the linea to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/lineas/{id}")
    @Timed
    public ResponseEntity<Void> deleteLinea(@PathVariable Long id) {
        log.debug("REST request to delete Linea : {}", id);
        lineaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
