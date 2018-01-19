package net.metro.app.web.rest;

import net.metro.app.ProyCeroApp;

import net.metro.app.domain.Fecha;
import net.metro.app.repository.FechaRepository;
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

import net.metro.app.domain.enumeration.TipoDia;
/**
 * Test class for the FechaResource REST controller.
 *
 * @see FechaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProyCeroApp.class)
public class FechaResourceIntTest {

    private static final String DEFAULT_DIA = "AAAAAAAAAA";
    private static final String UPDATED_DIA = "BBBBBBBBBB";

    private static final String DEFAULT_HORA = "AAAAAAAAAA";
    private static final String UPDATED_HORA = "BBBBBBBBBB";

    private static final TipoDia DEFAULT_TIPO_DIA = TipoDia.L;
    private static final TipoDia UPDATED_TIPO_DIA = TipoDia.V;

    @Autowired
    private FechaRepository fechaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFechaMockMvc;

    private Fecha fecha;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FechaResource fechaResource = new FechaResource(fechaRepository);
        this.restFechaMockMvc = MockMvcBuilders.standaloneSetup(fechaResource)
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
    public static Fecha createEntity(EntityManager em) {
        Fecha fecha = new Fecha()
            .dia(DEFAULT_DIA)
            .hora(DEFAULT_HORA)
            .tipoDia(DEFAULT_TIPO_DIA);
        return fecha;
    }

    @Before
    public void initTest() {
        fecha = createEntity(em);
    }

    @Test
    @Transactional
    public void createFecha() throws Exception {
        int databaseSizeBeforeCreate = fechaRepository.findAll().size();

        // Create the Fecha
        restFechaMockMvc.perform(post("/api/fechas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fecha)))
            .andExpect(status().isCreated());

        // Validate the Fecha in the database
        List<Fecha> fechaList = fechaRepository.findAll();
        assertThat(fechaList).hasSize(databaseSizeBeforeCreate + 1);
        Fecha testFecha = fechaList.get(fechaList.size() - 1);
        assertThat(testFecha.getDia()).isEqualTo(DEFAULT_DIA);
        assertThat(testFecha.getHora()).isEqualTo(DEFAULT_HORA);
        assertThat(testFecha.getTipoDia()).isEqualTo(DEFAULT_TIPO_DIA);
    }

    @Test
    @Transactional
    public void createFechaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fechaRepository.findAll().size();

        // Create the Fecha with an existing ID
        fecha.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFechaMockMvc.perform(post("/api/fechas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fecha)))
            .andExpect(status().isBadRequest());

        // Validate the Fecha in the database
        List<Fecha> fechaList = fechaRepository.findAll();
        assertThat(fechaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllFechas() throws Exception {
        // Initialize the database
        fechaRepository.saveAndFlush(fecha);

        // Get all the fechaList
        restFechaMockMvc.perform(get("/api/fechas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fecha.getId().intValue())))
            .andExpect(jsonPath("$.[*].dia").value(hasItem(DEFAULT_DIA.toString())))
            .andExpect(jsonPath("$.[*].hora").value(hasItem(DEFAULT_HORA.toString())))
            .andExpect(jsonPath("$.[*].tipoDia").value(hasItem(DEFAULT_TIPO_DIA.toString())));
    }

    @Test
    @Transactional
    public void getFecha() throws Exception {
        // Initialize the database
        fechaRepository.saveAndFlush(fecha);

        // Get the fecha
        restFechaMockMvc.perform(get("/api/fechas/{id}", fecha.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fecha.getId().intValue()))
            .andExpect(jsonPath("$.dia").value(DEFAULT_DIA.toString()))
            .andExpect(jsonPath("$.hora").value(DEFAULT_HORA.toString()))
            .andExpect(jsonPath("$.tipoDia").value(DEFAULT_TIPO_DIA.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingFecha() throws Exception {
        // Get the fecha
        restFechaMockMvc.perform(get("/api/fechas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFecha() throws Exception {
        // Initialize the database
        fechaRepository.saveAndFlush(fecha);
        int databaseSizeBeforeUpdate = fechaRepository.findAll().size();

        // Update the fecha
        Fecha updatedFecha = fechaRepository.findOne(fecha.getId());
        updatedFecha
            .dia(UPDATED_DIA)
            .hora(UPDATED_HORA)
            .tipoDia(UPDATED_TIPO_DIA);

        restFechaMockMvc.perform(put("/api/fechas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFecha)))
            .andExpect(status().isOk());

        // Validate the Fecha in the database
        List<Fecha> fechaList = fechaRepository.findAll();
        assertThat(fechaList).hasSize(databaseSizeBeforeUpdate);
        Fecha testFecha = fechaList.get(fechaList.size() - 1);
        assertThat(testFecha.getDia()).isEqualTo(UPDATED_DIA);
        assertThat(testFecha.getHora()).isEqualTo(UPDATED_HORA);
        assertThat(testFecha.getTipoDia()).isEqualTo(UPDATED_TIPO_DIA);
    }

    @Test
    @Transactional
    public void updateNonExistingFecha() throws Exception {
        int databaseSizeBeforeUpdate = fechaRepository.findAll().size();

        // Create the Fecha

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restFechaMockMvc.perform(put("/api/fechas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fecha)))
            .andExpect(status().isCreated());

        // Validate the Fecha in the database
        List<Fecha> fechaList = fechaRepository.findAll();
        assertThat(fechaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteFecha() throws Exception {
        // Initialize the database
        fechaRepository.saveAndFlush(fecha);
        int databaseSizeBeforeDelete = fechaRepository.findAll().size();

        // Get the fecha
        restFechaMockMvc.perform(delete("/api/fechas/{id}", fecha.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Fecha> fechaList = fechaRepository.findAll();
        assertThat(fechaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Fecha.class);
        Fecha fecha1 = new Fecha();
        fecha1.setId(1L);
        Fecha fecha2 = new Fecha();
        fecha2.setId(fecha1.getId());
        assertThat(fecha1).isEqualTo(fecha2);
        fecha2.setId(2L);
        assertThat(fecha1).isNotEqualTo(fecha2);
        fecha1.setId(null);
        assertThat(fecha1).isNotEqualTo(fecha2);
    }
}
