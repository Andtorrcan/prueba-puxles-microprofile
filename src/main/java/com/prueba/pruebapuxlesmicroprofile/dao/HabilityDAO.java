package com.prueba.pruebapuxlesmicroprofile.dao;

import java.util.List;
import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;

import com.prueba.pruebapuxlesmicroprofile.model.Hability;

@ApplicationScoped
public class HabilityDAO {

	@Inject
	private EntityManager em;

	public List<Hability> getAll() {
		return em.createNamedQuery("Hability.findAll", Hability.class).getResultList();
	}

	public Hability findById(String id) {
		return em.find(Hability.class, id);
	}

	public void update(Hability hab) {
		em.getTransaction().begin();
		em.merge(hab);
		em.getTransaction().commit();

	}

	public void create(Hability hab) {
		em.getTransaction().begin();
		em.persist(hab);
		em.getTransaction().commit();
	}

	public void delete(Hability hab) {
		em.getTransaction().begin();
		em.remove(hab);
		em.getTransaction().commit();
	}
}
