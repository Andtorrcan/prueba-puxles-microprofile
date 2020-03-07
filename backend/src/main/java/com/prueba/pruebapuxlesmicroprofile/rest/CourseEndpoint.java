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

import com.prueba.pruebapuxlesmicroprofile.dao.CourseDAO;
import com.prueba.pruebapuxlesmicroprofile.model.Course;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
@ApplicationScoped
@Path("/course")
@Api(value = "/course", tags = "course")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CourseEndpoint {

	@Inject
    private CourseDAO courseDao;

    @GET
    @ApiOperation(value = "Trae la lista de talleres", response = List.class)
    public Response getAll() {
        return Response.ok(courseDao.getAll()).build();
    }
    
    @GET
    @Path("{id}")
    @ApiOperation(value = "Trae un taller por ID", response = List.class)
    public Response getCourse(@PathParam("id") String id) {
        Course course = courseDao.findById(id);
        return Response.ok(course).build();
    }
    
    @POST
    @ApiOperation(value = "Crea un taller", response = Response.class)
    public Response create(Course course) {
        courseDao.create(course);
        return Response.ok().build();
    }
    
    @PUT
    @Path("{id}")
    @ApiOperation(value = "Actualiza un taller, incluyendo las habilidades", response = Response.class)
    public Response update(@PathParam("id") String id, Course course) {
    	Course updateTodo = courseDao.findById(id);
        updateTodo.setDate(course.getDate());
        updateTodo.setQualification(course.getQualification());
        updateTodo.setHabilities_list(course.getHabilities_list());
        courseDao.update(updateTodo);
        return Response.ok().build();
    }
    
    @DELETE
    @Path("{id}")
    @ApiOperation(value = "Elimina un taller por ID", response = Response.class)
    public Response delete(@PathParam("id") String id) {
    	Course getCourse = courseDao.findById(id);
        courseDao.delete(getCourse);
        return Response.ok().build();
    }
}
