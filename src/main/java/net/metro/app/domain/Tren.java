package net.metro.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Tren.
 */
@Entity
@Table(name = "tren")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Tren implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero")
    private String numero;

    @Column(name = "viajeros")
    private String viajeros;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumero() {
        return numero;
    }

    public Tren numero(String numero) {
        this.numero = numero;
        return this;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getViajeros() {
        return viajeros;
    }

    public Tren viajeros(String viajeros) {
        this.viajeros = viajeros;
        return this;
    }

    public void setViajeros(String viajeros) {
        this.viajeros = viajeros;
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
        Tren tren = (Tren) o;
        if (tren.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tren.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Tren{" +
            "id=" + getId() +
            ", numero='" + getNumero() + "'" +
            ", viajeros='" + getViajeros() + "'" +
            "}";
    }
}
