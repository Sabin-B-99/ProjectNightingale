package com.projectnight.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;


@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"com.projectnight"})
public class ApplicationConfig implements WebMvcConfigurer {

    /*
        Configuration to tell jackson to ignore uninitialized data while serializing Objects.
        From stackoverflow: https://stackoverflow.com/a/54412744/16958939
        Used here to omit lazy loaded attributes, instead of writing @JsonIgnore
        to omit them individually.
     */
    public void extendMessageConverters(List<HttpMessageConverter<?>> converters){
        for (HttpMessageConverter converter: converters) {
            if(converter instanceof MappingJackson2HttpMessageConverter){
                ObjectMapper mapper = ((MappingJackson2HttpMessageConverter) converter).getObjectMapper();
                mapper.registerModule(new Hibernate5Module());
            }
        }
    }
}
