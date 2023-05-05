package com.projectnight.dao;

import com.projectnight.entity.users.User;
import org.hibernate.query.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public class UserDAOImpl implements UserDAO{

    @Autowired
    @Qualifier("userAuthSessionFactory")
    private SessionFactory sessionFactory;

    @Override
    @Transactional(value = "userAuthTransactionManager")
    public Optional<User> loadUserByUserName(String userName) {
        Session session = sessionFactory.getCurrentSession();
        Query<User> query = session.createQuery("FROM User u WHERE u.username = :username", User.class);
        query.setParameter( "username",userName);
        System.out.println(query.getSingleResult());
        Optional<User> user = Optional.ofNullable(query.getSingleResult());
        return user;
    }
}
