package com.prueba.pruebapuxlesmicroprofile.model;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;

import org.hibernate.annotations.GenericGenerator;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@NamedQuery(name = "Course.findAll", query = "SELECT c FROM Course c")
public class Course {
	/**
	 * Id del documento
	 */
	@Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;
	/**
	 * Nombre
	 */
	private String name;
	/**
	 * Fecha del taller
	 */
	@JsonFormat(pattern="yyyy-MM-dd'T'HH:mm:ss")
    private Date date;
    /**
     * Calificación- La definí como entero
     */
    private int qualification;
    /**
     * Lugar, lo tome como una ubicación fisica
     */
    private String place;
    /**
     * Lista de habilidades
     */
    @OneToMany
    private List<Hability> habilities_list;

    //----getters & Setters
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public int getQualification() {
		return qualification;
	}
	public void setQualification(int qualification) {
		this.qualification = qualification;
	}
	public String getPlace() {
		return place;
	}
	public void setPlace(String place) {
		this.place = place;
	}
	public List<Hability> getHabilities_list() {
		return habilities_list;
	}
    
	public void setHabilities_list(List<Hability> habilities_list) {
		this.habilities_list = habilities_list;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}

	
}