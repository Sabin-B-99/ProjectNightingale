package com.projnight.authorizationserver.config;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.List;

@Component
public class CORSCustomizer {
    public void corsCustomizer(HttpSecurity httpSecurity) throws Exception{
        httpSecurity.cors(c -> {
            CorsConfigurationSource source = s -> {
                CorsConfiguration configuration = new CorsConfiguration();
                configuration.setAllowCredentials(true);
                configuration.setAllowedOrigins(List.of("http://127.0.0.1:4200"));
                configuration.setAllowedHeaders(List.of("*"));
                configuration.setAllowedMethods(List.of("*"));
                return configuration;
            };
            c.configurationSource(source);
        });
    }
}
