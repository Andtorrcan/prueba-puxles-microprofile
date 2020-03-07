package com.prueba.pruebapuxlesmicroprofile.rest;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

import io.swagger.annotations.Contact;
import io.swagger.annotations.Info;
import io.swagger.annotations.SwaggerDefinition;

@ApplicationPath("/")
@SwaggerDefinition (
info = @Info (
        title = "Prueba técnica Puxless - Microprofile - MongoDB",
        description = "3 tablas (persona, taller, habilidades), donde una persona puede hacer muchos talleres y un taller tiene muchas habilidades.",
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
public class RestApplication extends Application {
}
