package com.projectnight.dao;

import com.projectnight.entity.practiceroutines.ChordChanges;
import com.projectnight.entity.practiceroutines.Chords;
import com.projectnight.entity.practiceroutines.Progressions;
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
    private SessionFactory sessionFactory;

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
        Session session = sessionFactory.getCurrentSession();
        Topics topic = session.get(Topics.class, topiId);
        session.delete(topic);
    }

    @Override
    public List<Topics> getTopicsByRoutineId(int routineId) {
        Session session = sessionFactory.getCurrentSession();
        Query<Topics> query = session.createQuery("select t from Topics t left join t.routinesAssoc rt where rt.routines.id = :routineid", Topics.class);
        query.setParameter("routineid", routineId);
        List<Topics> topics = query.getResultList();
        return topics;
    }

    @Override
    public List<Progressions> getProgressionsByTopicId(int topicId){
        Session session = sessionFactory.getCurrentSession();
        Query<Progressions> query = session.createQuery("select p from Progressions p left join p.topicsAssoc pt where pt.topics.id = :topicid", Progressions.class);
        query.setParameter("topicid", topicId);
        List<Progressions> progressions = query.getResultList();
        return progressions;
    }

    @Override
    public List<ChordChanges> getChordChangesByTopicId(int topicId) {
        Session session = sessionFactory.getCurrentSession();
        Query<ChordChanges> query = session.createQuery("select changes from ChordChanges changes left join changes.topicAssoc tc left join tc.topics t where t.id = :topicid", ChordChanges.class);
        query.setParameter("topicid", topicId);
        List<ChordChanges> chordChanges = query.getResultList();
        return chordChanges;
    }

    @Override
    public List<Chords> getChordsByTopicId(int topicId) {
        Session session = sessionFactory.getCurrentSession();
        Query<Chords> query = session.createQuery("select chords from Chords chords left join chords.topicAssoc tc left join tc.topics top where top.id =:topicid", Chords.class);
        query.setParameter("topicid", topicId);
        List<Chords> chords = query.getResultList();
        return chords;
    }
}
