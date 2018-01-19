package net.metro.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

import net.metro.app.domain.enumeration.TipoEvento;

/**
 * A Evento.
 */
@Entity
@Table(name = "evento")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Evento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_evento")
    private TipoEvento tipoEvento;

    @OneToOne
    @JoinColumn(unique = true)
    private Linea linea;

    @OneToOne
    @JoinColumn(unique = true)
    private Fecha fecha;

    @OneToOne
    @JoinColumn(unique = true)
    private Tren tren;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public Evento nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public TipoEvento getTipoEvento() {
        return tipoEvento;
    }

    public Evento tipoEvento(TipoEvento tipoEvento) {
        this.tipoEvento = tipoEvento;
        return this;
    }

    public void setTipoEvento(TipoEvento tipoEvento) {
        this.tipoEvento = tipoEvento;
    }

    public Linea getLinea() {
        return linea;
    }

    public Evento linea(Linea linea) {
        this.linea = linea;
        return this;
    }

    public void setLinea(Linea linea) {
        this.linea = linea;
    }

    public Fecha getFecha() {
        return fecha;
    }

    public Evento fecha(Fecha fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(Fecha fecha) {
        this.fecha = fecha;
    }

    public Tren getTren() {
        return tren;
    }

    public Evento tren(Tren tren) {
        this.tren = tren;
        return this;
    }

    public void setTren(Tren tren) {
        this.tren = tren;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Evento evento = (Evento) o;
        if (evento.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), evento.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Evento{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", tipoEvento='" + getTipoEvento() + "'" +
            "}";
    }
}
