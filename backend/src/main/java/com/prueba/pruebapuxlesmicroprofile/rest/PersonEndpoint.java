package com.prueba.pruebapuxlesmicroprofile.rest;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.prueba.pruebapuxlesmicroprofile.dao.PersonDAO;
import com.prueba.pruebapuxlesmicroprofile.model.Hability;
import com.prueba.pruebapuxlesmicroprofile.model.Person;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@ApplicationScoped
@Path("/person")
@Api(value = "/person", tags = "person")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PersonEndpoint {
	@Inject
	private PersonDAO personDao;

	@GET
	@ApiOperation(value = "Trae todas las personas", response = List.class)
	public Response getAll() {
		return Response.ok(personDao.getAll()).build();
	}

	@GET
	@Path("{id}")
	@ApiOperation(value = "Obtener persona por id", response = Hability.class)
	public Response getPerson(@PathParam("id") String id) {
		Person person = personDao.findById(id);
		return Response.ok(person).build();
	}

	@POST
	@ApiOperation(value = "Crear habilidad", response = Response.class)
	public Response create(Person person) {
		personDao.create(person);
		return Response.status(Response.Status.CREATED).build();
	}

	@PUT
	@Path("{id}")
	@ApiOperation(value = "Actualizar habilidad", response = Response.class)
	public Response update(@PathParam("id") String id, Person per) {
		Person person = personDao.findById(id);
		person.setName(per.getName());
		person.setLastname(per.getLastname());
		person.setAddress(per.getAddress());
		person.setTelephone(person.getTelephone());
		person.setCorreo(per.getCorreo());
		person.setCourses_list(per.getCourses_list());
		personDao.update(per);
		return Response.status(Status.ACCEPTED).build();
	}

	@DELETE
	@Path("{id}")
	@ApiOperation(value = "Actualizar habilidad", response = Response.class)
	public Response delete(@PathParam("id") String id) {
		Person person = personDao.findById(id);
		personDao.delete(person);
		return Response.status(Status.ACCEPTED).build();
	}

}
