package com.prueba.pruebapuxlesmicroprofile.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;

import org.hibernate.annotations.GenericGenerator;

@Entity
@NamedQuery(name = "Person.findAll", query = "SELECT p FROM Person p")
public class Person {
	/**
	 * Id del documento (no confundir con documento de la persona)
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
	 * Apellidos
	 */
	private String lastname;
	/**
	 * Dirección
	 */
	private String address;
	/**
	 * Teléfono
	 */
	private int telephone;
	/**
	 * Correo
	 */
	@Column(unique = true)
	private String correo;
	/**
	 * Lista de talleres
	 */
    @OneToMany()
    private List<Course> courses_list;
	
	//----Getters & Setters
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public int getTelephone() {
		return telephone;
	}
	public void setTelephone(int telephone) {
		this.telephone = telephone;
	}
	public String getCorreo() {
		return correo;
	}
	public void setCorreo(String correo) {
		this.correo = correo;
	}
	public List<Course> getCourses_list() {
		return courses_list;
	}
	public void setCourses_list(List<Course> courses_list) {
		this.courses_list = courses_list;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}	
}