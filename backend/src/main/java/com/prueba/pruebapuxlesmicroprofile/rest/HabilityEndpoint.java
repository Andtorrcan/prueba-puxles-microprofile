package com.prueba.pruebapuxlesmicroprofile.rest;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

import com.prueba.pruebapuxlesmicroprofile.dao.HabilityDAO;
import com.prueba.pruebapuxlesmicroprofile.model.Hability;

import javax.ws.rs.GET;
import javax.ws.rs.PATCH;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.core.MediaType;

@ApplicationScoped
@Path("/hability")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class HabilityEndpoint {
	
	@Inject
    private HabilityDAO habilityDao;

    @GET
    public Response getAll() {
        return Response.ok(habilityDao.getAll()).build();
    }
    
    @GET
    @Path("{id}")
    public Response getHability(@PathParam("id") String id) {
        Hability hab = habilityDao.findById(id);
        return Response.ok(hab).build();
    }
    
    @POST
    public Response create(Hability hab) {
        habilityDao.create(hab);
        return Response.ok().build();
    }
    
    @PATCH
    @Path("{id}")
    public Response update(@PathParam("id") String id, Hability hab) {
        Hability updateTodo = habilityDao.findById(id);
        updateTodo.setDescription(hab.getDescription());
        habilityDao.update(updateTodo);
        return Response.ok().build();
    }
    
    @DELETE
    @Path("{id}")
    public Response delete(@PathParam("id") String id) {
        Hability getTodo = habilityDao.findById(id);
        habilityDao.delete(getTodo);
        return Response.ok().build();
    }
}
