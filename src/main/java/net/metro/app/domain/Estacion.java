package net.metro.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

import net.metro.app.domain.enumeration.TipoEstacion;

import net.metro.app.domain.enumeration.Via;

/**
 * A Estacion.
 */
@Entity
@Table(name = "estacion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Estacion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "nemo")
    private String nemo;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_estacion")
    private TipoEstacion tipoEstacion;

    @Enumerated(EnumType.STRING)
    @Column(name = "via")
    private Via via;

    @ManyToOne
    private Linea linea;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Estacion name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNemo() {
        return nemo;
    }

    public Estacion nemo(String nemo) {
        this.nemo = nemo;
        return this;
    }

    public void setNemo(String nemo) {
        this.nemo = nemo;
    }

    public TipoEstacion getTipoEstacion() {
        return tipoEstacion;
    }

    public Estacion tipoEstacion(TipoEstacion tipoEstacion) {
        this.tipoEstacion = tipoEstacion;
        return this;
    }

    public void setTipoEstacion(TipoEstacion tipoEstacion) {
        this.tipoEstacion = tipoEstacion;
    }

    public Via getVia() {
        return via;
    }

    public Estacion via(Via via) {
        this.via = via;
        return this;
    }

    public void setVia(Via via) {
        this.via = via;
    }

    public Linea getLinea() {
        return linea;
    }

    public Estacion linea(Linea linea) {
        this.linea = linea;
        return this;
    }

    public void setLinea(Linea linea) {
        this.linea = linea;
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
        Estacion estacion = (Estacion) o;
        if (estacion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), estacion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Estacion{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", nemo='" + getNemo() + "'" +
            ", tipoEstacion='" + getTipoEstacion() + "'" +
            ", via='" + getVia() + "'" +
            "}";
    }
}
