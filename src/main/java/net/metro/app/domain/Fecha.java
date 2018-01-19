package net.metro.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

import net.metro.app.domain.enumeration.TipoDia;

/**
 * A Fecha.
 */
@Entity
@Table(name = "fecha")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Fecha implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dia")
    private String dia;

    @Column(name = "hora")
    private String hora;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_dia")
    private TipoDia tipoDia;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDia() {
        return dia;
    }

    public Fecha dia(String dia) {
        this.dia = dia;
        return this;
    }

    public void setDia(String dia) {
        this.dia = dia;
    }

    public String getHora() {
        return hora;
    }

    public Fecha hora(String hora) {
        this.hora = hora;
        return this;
    }

    public void setHora(String hora) {
        this.hora = hora;
    }

    public TipoDia getTipoDia() {
        return tipoDia;
    }

    public Fecha tipoDia(TipoDia tipoDia) {
        this.tipoDia = tipoDia;
        return this;
    }

    public void setTipoDia(TipoDia tipoDia) {
        this.tipoDia = tipoDia;
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
        Fecha fecha = (Fecha) o;
        if (fecha.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), fecha.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Fecha{" +
            "id=" + getId() +
            ", dia='" + getDia() + "'" +
            ", hora='" + getHora() + "'" +
            ", tipoDia='" + getTipoDia() + "'" +
            "}";
    }
}
