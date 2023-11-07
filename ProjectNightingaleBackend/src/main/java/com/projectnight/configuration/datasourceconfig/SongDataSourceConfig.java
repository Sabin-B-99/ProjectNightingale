package com.projectnight.configuration.datasourceconfig;

import com.mchange.v2.c3p0.ComboPooledDataSource;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.beans.PropertyVetoException;

@Configuration
@EnableTransactionManagement
@PropertySource("classpath:application.properties")
@EnableJpaRepositories(
        basePackages = {"com.projectnight.repository.songs"},
        entityManagerFactoryRef = "songsSessionFactory",
        transactionManagerRef = "songsTransactionManager"
)
public class SongDataSourceConfig {

    private final Environment env;
    private final DataSourcesPropertiesConfigurer dataSourcesPropertiesConfigurer;

    @Autowired
    public SongDataSourceConfig(Environment env, DataSourcesPropertiesConfigurer dataSourcesPropertiesConfigurer) {
        this.env = env;
        this.dataSourcesPropertiesConfigurer = dataSourcesPropertiesConfigurer;
    }


    @Bean(name = "songsDataSource")
    public DataSource projectNightingalePracticeRoutineDataSource(){
        ComboPooledDataSource dataSource = new ComboPooledDataSource();
        try {
            dataSource.setDriverClass(env.getProperty("jdbc.songs.driver"));
        }catch (PropertyVetoException e){
            throw new RuntimeException(e);
        }

        dataSource.setJdbcUrl(env.getProperty("jdbc.songs.url"));
        dataSource.setUser(env.getProperty("jdbc.songs.user"));
        dataSource.setPassword(env.getProperty("jdbc.songs.password"));
        dataSourcesPropertiesConfigurer.configureDataSourcePoolSizes(dataSource);
        return dataSource;
    }

    @Bean(name = "songsSessionFactory")
    public LocalSessionFactoryBean practiceRoutineLocalSessionFactoryBean(
            @Qualifier("songsDataSource") DataSource dataSource
    ){
        LocalSessionFactoryBean localSessionFactoryBean = new LocalSessionFactoryBean();
        localSessionFactoryBean.setDataSource(dataSource);
        localSessionFactoryBean.setPackagesToScan(env.getProperty("hibernate.packagesToScan"));
        localSessionFactoryBean.setHibernateProperties(dataSourcesPropertiesConfigurer.getHibernateProperties());
        return localSessionFactoryBean;
    }

    @Bean(name = "songsTransactionManager")
    public HibernateTransactionManager practiceRoutineTransactionManager(
            @Qualifier("songsDataSource") DataSource dataSource,
            @Qualifier("songsSessionFactory") SessionFactory sessionFactory
    ){
        HibernateTransactionManager txm = new HibernateTransactionManager();
        txm.setDataSource(dataSource);
        txm.setSessionFactory(sessionFactory);
        return txm;
    }
}
