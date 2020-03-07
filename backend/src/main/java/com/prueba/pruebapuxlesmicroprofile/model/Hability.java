package com.prueba.pruebapuxlesmicroprofile.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.GenericGenerator;
import javax.persistence.NamedQuery;

@Entity
@NamedQuery(name = "Hability.findAll", query = "SELECT t FROM Hability t")
public class Hability {
	/**
	 * Id del documento
	 */
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
    /**
     * Nombre de la habilidad
     */
    private String description;
    /**
     * LLave relacional con taller
     */
    @ManyToOne
    @JoinColumn(name = "course_id_fk", nullable = false, updatable = true)
    private Course course;
    //----Getters & Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    @Override
    public String toString() {
        return "Todo{" + "id=" + id + "description=" + description + '}';
    }
}