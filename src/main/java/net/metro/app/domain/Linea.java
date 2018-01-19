package net.metro.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import net.metro.app.domain.enumeration.NombreLinea;

/**
 * A Linea.
 */
@Entity
@Table(name = "linea")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Linea implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "nombre_linea")
    private NombreLinea nombreLinea;

    @OneToOne
    @JoinColumn(unique = true)
    private TablaTrenes tablaTrenes;

    @OneToMany(mappedBy = "linea")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Estacion> estacions = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public NombreLinea getNombreLinea() {
        return nombreLinea;
    }

    public Linea nombreLinea(NombreLinea nombreLinea) {
        this.nombreLinea = nombreLinea;
        return this;
    }

    public void setNombreLinea(NombreLinea nombreLinea) {
        this.nombreLinea = nombreLinea;
    }

    public TablaTrenes getTablaTrenes() {
        return tablaTrenes;
    }

    public Linea tablaTrenes(TablaTrenes tablaTrenes) {
        this.tablaTrenes = tablaTrenes;
        return this;
    }

    public void setTablaTrenes(TablaTrenes tablaTrenes) {
        this.tablaTrenes = tablaTrenes;
    }

    public Set<Estacion> getEstacions() {
        return estacions;
    }

    public Linea estacions(Set<Estacion> estacions) {
        this.estacions = estacions;
        return this;
    }

    public Linea addEstacion(Estacion estacion) {
        this.estacions.add(estacion);
        estacion.setLinea(this);
        return this;
    }

    public Linea removeEstacion(Estacion estacion) {
        this.estacions.remove(estacion);
        estacion.setLinea(null);
        return this;
    }

    public void setEstacions(Set<Estacion> estacions) {
        this.estacions = estacions;
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
        Linea linea = (Linea) o;
        if (linea.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), linea.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Linea{" +
            "id=" + getId() +
            ", nombreLinea='" + getNombreLinea() + "'" +
            "}";
    }
}
