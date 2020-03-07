package com.prueba.pruebapuxlesmicroprofile.dao;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import com.prueba.pruebapuxlesmicroprofile.model.Person;

@ApplicationScoped
public class PersonDAO {
	@Inject
	private EntityManager em;

	public List<Person> getAll() {
		return em.createNamedQuery("Person.findAll", Person.class).getResultList();
	}

	public Person findById(String id) {
		return em.find(Person.class, id);
	}

	public void update(Person person) {
		em.getTransaction().begin();
		em.merge(person);
		em.getTransaction().commit();

	}

	public void create(Person person) {
		em.getTransaction().begin();
		em.persist(person);
		em.getTransaction().commit();
	}

	public void delete(Person person) {
		em.getTransaction().begin();
		em.remove(person);
		em.getTransaction().commit();
	}
}
