package com.projectnight.configuration;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.*;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import javax.sql.DataSource;
import java.beans.PropertyVetoException;

@Configuration
@ComponentScan(basePackages = "com.projectnight")
@EnableWebMvc
@PropertySource("classpath:persistence_mysql.properties")
public class AppConfig {

    @Autowired
    private Environment env;

    @Bean
    public ViewResolver viewResolver(){
        InternalResourceViewResolver resourceViewResolver = new InternalResourceViewResolver();
        resourceViewResolver.setPrefix("/WEB-INF/views/");
        resourceViewResolver.setSuffix(".jsp");
        return resourceViewResolver;
    }

    @Bean
    @Primary
    public DataSource projectNightUserDataSource(){

        String driver = env.getProperty("jdbc.user.driver");
        String url = env.getProperty("jdbc.user.url");
        String user = env.getProperty("jdbc.user.user");
        String password = env.getProperty("jdbc.user.password");

        ComboPooledDataSource dataSource = dataSourceConfigurerHelper(driver, url , user, password);
        return dataSource;
    }

    @Bean
    public DataSource projectNightPracticeRoutineDataSource(){

        String driver = env.getProperty("jdbc.practiceRoutine.driver");
        String url = env.getProperty("jdbc.practiceRoutine.url");
        String user = env.getProperty("jdbc.practiceRoutine.user");
        String password = env.getProperty("jdbc.practiceRoutine.password");

        ComboPooledDataSource dataSource = dataSourceConfigurerHelper(driver, url, user, password);
        return dataSource;
    }

    private ComboPooledDataSource dataSourceConfigurerHelper(String driver,String url, String user, String password){
           ComboPooledDataSource dataSource = new ComboPooledDataSource();
           try {
               dataSource.setDriverClass((env.getProperty(driver)));
           }catch (PropertyVetoException e){
               throw new RuntimeException(e);
           }

        dataSource.setJdbcUrl(env.getProperty(url));
        dataSource.setUser(env.getProperty(user));
        dataSource.setPassword(env.getProperty(password));

        dataSource.setInitialPoolSize(Integer.parseInt(env.getProperty("connection.pool.initialPoolSize")));
        dataSource.setMinPoolSize(Integer.parseInt(env.getProperty("connection.pool.minPoolSize")));
        dataSource.setMaxPoolSize(Integer.parseInt(env.getProperty("connection.pool.maxPoolSize")));
        dataSource.setMaxIdleTime(Integer.parseInt(env.getProperty("connection.pool.maxIdleTime")));

        return dataSource;
    }


}
