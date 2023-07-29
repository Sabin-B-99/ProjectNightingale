package com.projectnight.configuration;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.beans.PropertyVetoException;
import java.util.Properties;


@Configuration
@EnableTransactionManagement
@PropertySource("classpath:persistence_mysql.properties")
public class DataSourceConfig {
    private final Environment env;

    @Autowired
    public DataSourceConfig(Environment env) {
        this.env = env;
    }

    private void configureDataSourcePoolSizes(ComboPooledDataSource dataSource){
        dataSource.setInitialPoolSize(Integer.parseInt(env.getProperty("connection.pool.initialPoolSize")));
        dataSource.setMinPoolSize(Integer.parseInt(env.getProperty("connection.pool.minPoolSize")));
        dataSource.setMaxPoolSize(Integer.parseInt(env.getProperty("connection.pool.maxPoolSize")));
        dataSource.setMaxIdleTime(Integer.getInteger(env.getProperty("connection.pool.maxIdleTime")));
    }

    @Bean
    public Properties getHibernateProperties(){
        Properties properties = new Properties();
        properties.setProperty("hibernate.dialect", env.getProperty("hibernate.dialect"));
        properties.setProperty("hibernate.show_sql", env.getProperty("hibernate.show_sql"));
        return properties;
    }
    @Bean(name = "userAuthenticationDataSource")
    public DataSource projectNightingaleUserDataSource(){
        ComboPooledDataSource dataSource = new ComboPooledDataSource();
        try {
            dataSource.setDriverClass(env.getProperty("jdbc.user.driver"));
        }catch (PropertyVetoException e){
            throw new RuntimeException(e);
        }

        dataSource.setJdbcUrl(env.getProperty("jdbc.user.url"));
        dataSource.setUser(env.getProperty("jdbc.user.user"));
        dataSource.setPassword(env.getProperty("jdbc.user.password"));
        configureDataSourcePoolSizes(dataSource);
        return dataSource;
    }

    @Bean(name = "practiceRoutineDataSource")
    @Primary
    public DataSource projectNightingalePracticeRoutineDataSource(){
        ComboPooledDataSource dataSource = new ComboPooledDataSource();
        try {
            dataSource.setDriverClass(env.getProperty("jdbc.practiceRoutine.driver"));
        }catch (PropertyVetoException e){
            throw new RuntimeException(e);
        }
        dataSource.setJdbcUrl(env.getProperty("jdbc.practiceRoutine.url"));
        dataSource.setUser(env.getProperty("jdbc.practiceRoutine.user"));
        dataSource.setPassword(env.getProperty("jdbc.practiceRoutine.password"));
        configureDataSourcePoolSizes(dataSource);
        return dataSource;
    }

    @Bean(name = "userAuthenticationSessionFactory")
    public LocalSessionFactoryBean userAuthenticationLocalSessionFactoryBean(
            @Qualifier("userAuthenticationDataSource") DataSource dataSource){
        LocalSessionFactoryBean localSessionFactoryBean = new LocalSessionFactoryBean();
        localSessionFactoryBean.setDataSource(dataSource);
        localSessionFactoryBean.setPackagesToScan(env.getProperty("hibernate.packagesToScan"));
        localSessionFactoryBean.setHibernateProperties(getHibernateProperties());
        return localSessionFactoryBean;
    }

    @Bean(name = "practiceRoutineSessionFactory")
    @Primary
    public LocalSessionFactoryBean practiceRoutineLocalSessionFactoryBean(
            @Qualifier("practiceRoutineDataSource") DataSource dataSource
    ){
        LocalSessionFactoryBean localSessionFactoryBean = new LocalSessionFactoryBean();
        localSessionFactoryBean.setDataSource(dataSource);
        localSessionFactoryBean.setPackagesToScan(env.getProperty("hibernate.packagesToScan"));
        localSessionFactoryBean.setHibernateProperties(getHibernateProperties());
        return localSessionFactoryBean;
    }

    @Bean(name = "userAuthenticationTransactionManager")
    public HibernateTransactionManager userAuthenticationTransactionManager(
            @Qualifier("userAuthenticationDataSource") DataSource dataSource,
            @Qualifier("userAuthenticationSessionFactory")SessionFactory sessionFactory
    ){
        HibernateTransactionManager txm = new HibernateTransactionManager();
        txm.setDataSource(dataSource);
        txm.setSessionFactory(sessionFactory);
        return txm;
    }

    @Bean(name = "practiceRoutineTransactionManager")
    @Primary
    public HibernateTransactionManager practiceRoutineTransactionManager(
            @Qualifier("practiceRoutineDataSource") DataSource dataSource,
            @Qualifier("practiceRoutineSessionFactory") SessionFactory sessionFactory
    ){
        HibernateTransactionManager txm = new HibernateTransactionManager();
        txm.setDataSource(dataSource);
        txm.setSessionFactory(sessionFactory);
        return txm;
    }
}
