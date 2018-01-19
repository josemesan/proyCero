package net.metro.app.web.rest;

import net.metro.app.ProyCeroApp;

import net.metro.app.domain.Tren;
import net.metro.app.repository.TrenRepository;
import net.metro.app.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the TrenResource REST controller.
 *
 * @see TrenResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProyCeroApp.class)
public class TrenResourceIntTest {

    private static final String DEFAULT_NUMERO = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO = "BBBBBBBBBB";

    private static final String DEFAULT_VIAJEROS = "AAAAAAAAAA";
    private static final String UPDATED_VIAJEROS = "BBBBBBBBBB";

    @Autowired
    private TrenRepository trenRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTrenMockMvc;

    private Tren tren;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TrenResource trenResource = new TrenResource(trenRepository);
        this.restTrenMockMvc = MockMvcBuilders.standaloneSetup(trenResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tren createEntity(EntityManager em) {
        Tren tren = new Tren()
            .numero(DEFAULT_NUMERO)
            .viajeros(DEFAULT_VIAJEROS);
        return tren;
    }

    @Before
    public void initTest() {
        tren = createEntity(em);
    }

    @Test
    @Transactional
    public void createTren() throws Exception {
        int databaseSizeBeforeCreate = trenRepository.findAll().size();

        // Create the Tren
        restTrenMockMvc.perform(post("/api/trens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tren)))
            .andExpect(status().isCreated());

        // Validate the Tren in the database
        List<Tren> trenList = trenRepository.findAll();
        assertThat(trenList).hasSize(databaseSizeBeforeCreate + 1);
        Tren testTren = trenList.get(trenList.size() - 1);
        assertThat(testTren.getNumero()).isEqualTo(DEFAULT_NUMERO);
        assertThat(testTren.getViajeros()).isEqualTo(DEFAULT_VIAJEROS);
    }

    @Test
    @Transactional
    public void createTrenWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = trenRepository.findAll().size();

        // Create the Tren with an existing ID
        tren.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrenMockMvc.perform(post("/api/trens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tren)))
            .andExpect(status().isBadRequest());

        // Validate the Tren in the database
        List<Tren> trenList = trenRepository.findAll();
        assertThat(trenList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllTrens() throws Exception {
        // Initialize the database
        trenRepository.saveAndFlush(tren);

        // Get all the trenList
        restTrenMockMvc.perform(get("/api/trens?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tren.getId().intValue())))
            .andExpect(jsonPath("$.[*].numero").value(hasItem(DEFAULT_NUMERO.toString())))
            .andExpect(jsonPath("$.[*].viajeros").value(hasItem(DEFAULT_VIAJEROS.toString())));
    }

    @Test
    @Transactional
    public void getTren() throws Exception {
        // Initialize the database
        trenRepository.saveAndFlush(tren);

        // Get the tren
        restTrenMockMvc.perform(get("/api/trens/{id}", tren.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tren.getId().intValue()))
            .andExpect(jsonPath("$.numero").value(DEFAULT_NUMERO.toString()))
            .andExpect(jsonPath("$.viajeros").value(DEFAULT_VIAJEROS.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTren() throws Exception {
        // Get the tren
        restTrenMockMvc.perform(get("/api/trens/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTren() throws Exception {
        // Initialize the database
        trenRepository.saveAndFlush(tren);
        int databaseSizeBeforeUpdate = trenRepository.findAll().size();

        // Update the tren
        Tren updatedTren = trenRepository.findOne(tren.getId());
        updatedTren
            .numero(UPDATED_NUMERO)
            .viajeros(UPDATED_VIAJEROS);

        restTrenMockMvc.perform(put("/api/trens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTren)))
            .andExpect(status().isOk());

        // Validate the Tren in the database
        List<Tren> trenList = trenRepository.findAll();
        assertThat(trenList).hasSize(databaseSizeBeforeUpdate);
        Tren testTren = trenList.get(trenList.size() - 1);
        assertThat(testTren.getNumero()).isEqualTo(UPDATED_NUMERO);
        assertThat(testTren.getViajeros()).isEqualTo(UPDATED_VIAJEROS);
    }

    @Test
    @Transactional
    public void updateNonExistingTren() throws Exception {
        int databaseSizeBeforeUpdate = trenRepository.findAll().size();

        // Create the Tren

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restTrenMockMvc.perform(put("/api/trens")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tren)))
            .andExpect(status().isCreated());

        // Validate the Tren in the database
        List<Tren> trenList = trenRepository.findAll();
        assertThat(trenList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteTren() throws Exception {
        // Initialize the database
        trenRepository.saveAndFlush(tren);
        int databaseSizeBeforeDelete = trenRepository.findAll().size();

        // Get the tren
        restTrenMockMvc.perform(delete("/api/trens/{id}", tren.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Tren> trenList = trenRepository.findAll();
        assertThat(trenList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Tren.class);
        Tren tren1 = new Tren();
        tren1.setId(1L);
        Tren tren2 = new Tren();
        tren2.setId(tren1.getId());
        assertThat(tren1).isEqualTo(tren2);
        tren2.setId(2L);
        assertThat(tren1).isNotEqualTo(tren2);
        tren1.setId(null);
        assertThat(tren1).isNotEqualTo(tren2);
    }
}
