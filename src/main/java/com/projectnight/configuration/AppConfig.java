package com.projectnight.configuration;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.*;
import org.springframework.core.env.Environment;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

import javax.sql.DataSource;
import java.beans.PropertyVetoException;
import java.util.Properties;

@Configuration
@ComponentScan(basePackages = "com.projectnight")
@EnableWebMvc
@EnableTransactionManagement
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

    @Bean(name = "userAuthDataSource")
    @Primary
    public DataSource projectNightUserDataSource(){
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
    public DataSource projectNightPracticeRoutineDataSource(){
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

    public void configureDataSourcePoolSizes(ComboPooledDataSource dataSource){
        dataSource.setInitialPoolSize(Integer.parseInt(env.getProperty("connection.pool.initialPoolSize")));
        dataSource.setMinPoolSize(Integer.parseInt(env.getProperty("connection.pool.minPoolSize")));
        dataSource.setMaxPoolSize(Integer.parseInt(env.getProperty("connection.pool.maxPoolSize")));
        dataSource.setMaxIdleTime(Integer.parseInt(env.getProperty("connection.pool.maxIdleTime")));

    }

    @Bean
    public Properties getHibernateProperties(){
        Properties props = new Properties();
        props.setProperty("hibernate.dialect", env.getProperty("hibernate.dialect"));
        props.setProperty("hibernate.show_sql", env.getProperty("hibernate.show_sql"));
        return props;
    }

    @Bean(name = "practiceRoutineSessionFactory")
    @Primary
    public LocalSessionFactoryBean practiceRoutineLocalSessionFactoryBean(@Qualifier("practiceRoutineDataSource") DataSource dataSource){
        LocalSessionFactoryBean localSessionFactoryBean = new LocalSessionFactoryBean();
        localSessionFactoryBean.setDataSource(dataSource);
        localSessionFactoryBean.setPackagesToScan(env.getProperty("hibernate.packagesToScan"));
        localSessionFactoryBean.setHibernateProperties(getHibernateProperties());
        return localSessionFactoryBean;
    }

    @Bean(name = "userAuthSessionFactory")
    public LocalSessionFactoryBean userAuthLocalSessionFactoryBean(@Qualifier("userAuthDataSource") DataSource dataSource){
        LocalSessionFactoryBean localSessionFactoryBean = new LocalSessionFactoryBean();
        localSessionFactoryBean.setDataSource(dataSource);
        localSessionFactoryBean.setPackagesToScan(env.getProperty("hibernate.packagesToScan"));
        localSessionFactoryBean.setHibernateProperties(getHibernateProperties());
        return localSessionFactoryBean;
    }
    @Bean(name = "practiceRoutineTransactionManager")
    @Primary
    @Autowired
    public HibernateTransactionManager practiceRoutineTransactionManager(@Qualifier("practiceRoutineDataSource") DataSource dataSource, @Qualifier("practiceRoutineSessionFactory")  SessionFactory sessionFactory){
        HibernateTransactionManager txm = new HibernateTransactionManager();
        txm.setSessionFactory(sessionFactory);
        txm.setDataSource(dataSource);
        return txm;
    }

    @Bean(name = "userAuthTransactionManager")
    @Autowired
    public HibernateTransactionManager userAuthTransactionManager(@Qualifier("userAuthDataSource") DataSource dataSource, @Qualifier("userAuthSessionFactory") SessionFactory sessionFactory){
        HibernateTransactionManager txm = new HibernateTransactionManager();
        txm.setSessionFactory(sessionFactory);
        txm.setDataSource(dataSource);
        return txm;
    }
}
