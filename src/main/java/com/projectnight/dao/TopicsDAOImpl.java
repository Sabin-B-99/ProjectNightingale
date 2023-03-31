package com.projectnight.dao;

import com.projectnight.entity.practiceroutines.Topics;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TopicsDAOImpl implements TopicsDAO{

    @Autowired
    SessionFactory sessionFactory;

    @Override
    public List<Topics> getTopics() {
        Session session = sessionFactory.getCurrentSession();
        Query<Topics> query = session.createQuery("from Topics ", Topics.class);
        List<Topics> topics = query.getResultList();
        return topics;
    }

    @Override
    public void saveTopic(Topics topic) {
        Session session = sessionFactory.getCurrentSession();
        session.saveOrUpdate(topic);
    }

    @Override
    public Topics getTopic(int topicId) {
        Session session = sessionFactory.getCurrentSession();
        Topics topic = session.get(Topics.class, topicId);
        return topic;
    }

    @Override
    public void deleteTopic(int topiId) {
        Session session =sessionFactory.getCurrentSession();
        Topics topic = session.get(Topics.class, topiId);
        session.delete(topic);
    }
}
