package com.projectnight.configuration.datasourceconfig;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.beans.PropertyVetoException;

@Configuration
@PropertySource("classpath:persistence.mysql.properties")
@EnableTransactionManagement
@EnableJpaRepositories( basePackages = {"com.projectnight.repository.practice"},
        entityManagerFactoryRef = "practiceSessionFactory",
        transactionManagerRef = "practiceTransactionManager")
public class PracticeDataSourceConfig {
    private final Environment env;
    private final DataSourcesPropertiesConfigurer dataSourcesPropertiesConfigurer;


    @Autowired
    public PracticeDataSourceConfig(Environment env, DataSourcesPropertiesConfigurer dataSourcesPropertiesConfigurer) {
        this.env = env;
        this.dataSourcesPropertiesConfigurer = dataSourcesPropertiesConfigurer;
    }

    @Bean(name = "practiceDataSource")
    @Primary
    public DataSource projectNightingalePracticeRoutineDataSource(){
        ComboPooledDataSource dataSource = new ComboPooledDataSource();
        try {
            dataSource.setDriverClass(env.getProperty("jdbc.practice.driver"));
        }catch (PropertyVetoException e){
            throw new RuntimeException(e);
        }

        dataSource.setJdbcUrl(env.getProperty("jdbc.practice.url"));
        dataSource.setUser(env.getProperty("jdbc.practice.user"));
        dataSource.setPassword(env.getProperty("jdbc.practice.password"));
        dataSourcesPropertiesConfigurer.configureDataSourcePoolSizes(dataSource);
        return dataSource;
    }

    @Bean(name = "practiceSessionFactory")
    @Primary
    public LocalSessionFactoryBean practiceRoutineLocalSessionFactoryBean(
            @Qualifier("practiceDataSource") DataSource dataSource
    ){
        LocalSessionFactoryBean localSessionFactoryBean = new LocalSessionFactoryBean();
        localSessionFactoryBean.setDataSource(dataSource);
        localSessionFactoryBean.setPackagesToScan(env.getProperty("hibernate.packagesToScan"));
        localSessionFactoryBean.setHibernateProperties(dataSourcesPropertiesConfigurer.getHibernateProperties());
        return localSessionFactoryBean;
    }

    @Bean(name = "practiceTransactionManager")
    @Primary
    public HibernateTransactionManager practiceRoutineTransactionManager(
            @Qualifier("practiceDataSource") DataSource dataSource,
            @Qualifier("practiceSessionFactory") SessionFactory sessionFactory
    ){
        HibernateTransactionManager txm = new HibernateTransactionManager();
        txm.setDataSource(dataSource);
        txm.setSessionFactory(sessionFactory);
        return txm;
    }
}
