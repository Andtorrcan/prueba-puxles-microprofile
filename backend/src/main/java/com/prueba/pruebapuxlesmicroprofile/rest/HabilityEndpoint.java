package com.prueba.pruebapuxlesmicroprofile.rest;

import java.util.List;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.prueba.pruebapuxlesmicroprofile.dao.HabilityDAO;
import com.prueba.pruebapuxlesmicroprofile.model.Hability;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Contact;
import io.swagger.annotations.Info;
import io.swagger.annotations.SwaggerDefinition;

import javax.ws.rs.GET;
import javax.ws.rs.PATCH;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.core.MediaType;

@ApplicationScoped
@Path("/hability")
@Api(value = "/hability", tags = "hability")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@SwaggerDefinition (
info = @Info (
        title = "Habilidades",
        description = "CRUD habilidades",
        version = "1.0.0",
        contact = @Contact (
            name = "Andres Torres",
            email = "andtorrcan94@gmail.com"
        )
    ),
    host = "localhost",
    basePath = "/",
    schemes = {SwaggerDefinition.Scheme.HTTP, SwaggerDefinition.Scheme.HTTPS}
)
public class HabilityEndpoint {

	@Inject
	private HabilityDAO habilityDao;

	@GET
	@ApiOperation(value = "Trae la lista de habilidades", response = List.class)
	public Response getAll() {
		return Response.ok(habilityDao.getAll()).build();
	}

	@GET
	@Path("{id}")
	@ApiOperation(value = "Obtener habilidad por id", response = Hability.class)
	public Response getHability(@PathParam("id") String id) {
		Hability hab = habilityDao.findById(id);
		return Response.ok(hab).build();
	}

	@POST
	@ApiOperation(value = "Crear habilidad", response = Response.class)
	public Response create(Hability hab) {
		habilityDao.create(hab);
		return Response.status(Response.Status.CREATED).build();
	}

	@PATCH
	@Path("{id}")
	@ApiOperation(value = "Actualizar habilidad", response = Response.class)
	public Response update(@PathParam("id") String id, Hability hab) {
		Hability updateTodo = habilityDao.findById(id);
		updateTodo.setDescription(hab.getDescription());
		habilityDao.update(updateTodo);
		return Response.status(Status.ACCEPTED).build();
	}

	@DELETE
	@Path("{id}")
	@ApiOperation(value = "Actualizar habilidad", response = Response.class)
	public Response delete(@PathParam("id") String id) {
		Hability getTodo = habilityDao.findById(id);
		habilityDao.delete(getTodo);
		return Response.status(Status.ACCEPTED).build();
	}
}
