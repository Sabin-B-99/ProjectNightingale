package com.projectnight.configuration.securityconfig;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class ProjectNightingaleSecurityConfig {
    @Value("${jwkSetUri}")
    private String jwkSetUri;

    private final CORSCustomizer corsCustomizer;

    public ProjectNightingaleSecurityConfig(CORSCustomizer corsCustomizer) {
        this.corsCustomizer = corsCustomizer;
    }

    @Bean
    public SecurityFilterChain resourceServerSecurityFilterChain(HttpSecurity http) throws Exception{
        http.csrf().disable()
                .authorizeHttpRequests()
                .mvcMatchers("/api/tabs/**",
                        "/api/users/**",
                        "/api/chords/**")
                .permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .oauth2ResourceServer()
                .jwt()
                .jwkSetUri(jwkSetUri);

        corsCustomizer.corsCustomizer(http);
        return http.build();
    }


}
