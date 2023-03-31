package com.projectnight.dao;

import com.projectnight.entity.practiceroutines.Routines;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class RoutinesDAOImpl implements RoutinesDAO {
    @Autowired
    private SessionFactory sessionFactory;


    @Override
    public List<Routines> getRoutines() {
        Session session = sessionFactory.getCurrentSession();
        Query<Routines> query = session.createQuery("from Routines ", Routines.class);
        List<Routines> routines = query.getResultList();
        return routines;
    }

    @Override
    public void saveRoutine(Routines routine) {
        Session session = sessionFactory.getCurrentSession();
        session.saveOrUpdate(routine);
    }

    @Override
    public Routines getRoutine(int routineId) {
        Session session = sessionFactory.getCurrentSession();
        Routines routine = session.get(Routines.class, routineId);
        return routine;
    }

    @Override
    public void deleteRoutine(int routineId) {
        Session session = sessionFactory.getCurrentSession();
        Routines routines = session.get(Routines.class, routineId);
        session.delete(routines);
    }
}
