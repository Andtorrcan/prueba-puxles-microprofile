package com.prueba.pruebapuxlesmicroprofile.dao;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import com.prueba.pruebapuxlesmicroprofile.model.Course;

@ApplicationScoped
public class CourseDAO {
	@Inject
	private EntityManager em;

	public List<Course> getAll() {
		return em.createNamedQuery("Course.findAll", Course.class).getResultList();
	}

	public Course findById(String id) {
		return em.find(Course.class, id);
	}

	public void update(Course obj) {
		em.getTransaction().begin();
		em.merge(obj);
		em.getTransaction().commit();
	}

	public void create(Course obj) {
		em.getTransaction().begin();
		em.persist(obj);
		em.getTransaction().commit();
	}

	public void delete(Course obj) {
		em.getTransaction().begin();
		em.remove(obj);
		em.getTransaction().commit();
	}
}