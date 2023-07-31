package com.projectnight.configuration.datasourceconfig;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import java.util.Objects;
import java.util.Properties;

@Component
@PropertySource("classpath:persistence.mysql.properties")
public class DataSourcesPropertiesConfigurer {
    private final Environment env;

    @Autowired
    public DataSourcesPropertiesConfigurer(Environment env) {
        this.env = env;
    }

    public void configureDataSourcePoolSizes(ComboPooledDataSource dataSource){
        dataSource.setInitialPoolSize(Integer.parseInt(Objects.requireNonNull(env.getProperty("connection.pool.initialPoolSize"))));
        dataSource.setMinPoolSize(Integer.parseInt(Objects.requireNonNull(env.getProperty("connection.pool.minPoolSize"))));
        dataSource.setMaxPoolSize(Integer.parseInt(Objects.requireNonNull(env.getProperty("connection.pool.maxPoolSize"))));
        dataSource.setMaxIdleTime(Integer.parseInt(Objects.requireNonNull(env.getProperty("connection.pool.maxIdleTime"))));
    }

    public Properties getHibernateProperties(){
        Properties properties = new Properties();
        properties.setProperty("hibernate.dialect", env.getProperty("hibernate.dialect"));
        properties.setProperty("hibernate.show_sql", env.getProperty("hibernate.show_sql"));
        return properties;
    }

}
