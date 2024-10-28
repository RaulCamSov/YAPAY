package com.upc.tp_yapay.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Configura el directorio para servir archivos estáticos
        registry.addResourceHandler("/files/**")
                .addResourceLocations("file:/C:/Usuarios/USER/IdeaProjects/ImagenesYAPAY/");
    }
}
