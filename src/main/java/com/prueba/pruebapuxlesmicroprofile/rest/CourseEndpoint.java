package com.prueba.pruebapuxlesmicroprofile.rest;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.PATCH;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.prueba.pruebapuxlesmicroprofile.dao.CourseDAO;
import com.prueba.pruebapuxlesmicroprofile.model.Course;

@ApplicationScoped
@Path("/course")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CourseEndpoint {

	@Inject
    private CourseDAO courseDao;

    @GET
    public Response getAll() {
        return Response.ok(courseDao.getAll()).build();
    }
    
    @GET
    @Path("{id}")
    public Response getHability(@PathParam("id") String id) {
        Course course = courseDao.findById(id);
        return Response.ok(course).build();
    }
    
    @POST
    public Response create(Course course) {
        courseDao.create(course);
        return Response.ok().build();
    }
    
    @PATCH
    @Path("{id}")
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
    public Response delete(@PathParam("id") String id) {
    	Course getCourse = courseDao.findById(id);
        courseDao.delete(getCourse);
        return Response.ok().build();
    }
}
