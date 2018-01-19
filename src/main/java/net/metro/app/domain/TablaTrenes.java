package net.metro.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A TablaTrenes.
 */
@Entity
@Table(name = "tabla_trenes")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TablaTrenes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_trenes")
    private Integer numeroTrenes;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumeroTrenes() {
        return numeroTrenes;
    }

    public TablaTrenes numeroTrenes(Integer numeroTrenes) {
        this.numeroTrenes = numeroTrenes;
        return this;
    }

    public void setNumeroTrenes(Integer numeroTrenes) {
        this.numeroTrenes = numeroTrenes;
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
        TablaTrenes tablaTrenes = (TablaTrenes) o;
        if (tablaTrenes.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tablaTrenes.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TablaTrenes{" +
            "id=" + getId() +
            ", numeroTrenes='" + getNumeroTrenes() + "'" +
            "}";
    }
}
