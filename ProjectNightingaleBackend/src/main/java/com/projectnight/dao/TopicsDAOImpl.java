package com.projectnight.dao;

import com.projectnight.dto.Topic;
import com.projectnight.dto.TopicChord;
import com.projectnight.dto.TopicChordChange;
import com.projectnight.dto.TopicChordProgression;
import com.projectnight.entity.practiceroutines.*;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
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
    public Topic getTopic(int topicId) {
        Session session = sessionFactory.getCurrentSession();
        Topics topicEntity = session.get(Topics.class, topicId);
        Topic topic = new Topic(topicEntity.getTitle());
        return topic;
    }

    @Override
    public void deleteTopic(int topiId) {
        Session session = sessionFactory.getCurrentSession();
        Topics topic = session.get(Topics.class, topiId);
        session.delete(topic);
    }

    @Override
    public List<Topic> getTopicsByRoutineId(int routineId) {
        Session session = sessionFactory.getCurrentSession();
        Query<Topic> query = session.createQuery("select new com.projectnight.dto.Topic(t.title) from Topics t left join t.routinesAssoc rt where rt.routines.id = :routineid", Topic.class);
        query.setParameter("routineid", routineId);
        List<Topic> topics = query.getResultList();
        return topics;
    }

    //TODO: Refactor and make it possible to have multiple progressions in a single topic
    @Override
    public TopicChordProgression getProgressionByTopicId(int topicId){
        Session session = sessionFactory.getCurrentSession();

        Query<Chords> query = session.createQuery("select chrds from  Chords chrds left join chrds.progressionsAssoc chrdprogs left join chrdprogs.progressions progs left join progs.topicsAssoc progTops left join progTops.topics tops where tops.id =:topicid order by chrdprogs.order", Chords.class);
        Query<TopicProgressions> topicProgressionsQuery = session.createQuery("select topprogs from TopicProgressions topprogs left join topprogs.topics tops where tops.id =:topicid", TopicProgressions.class);
        query.setParameter("topicid", topicId);
        topicProgressionsQuery.setParameter("topicid", topicId);

        List<Chords> progressionChords = query.getResultList();
        TopicProgressions topicProgressions = topicProgressionsQuery.getSingleResult();

        List<String> chordNames = new ArrayList<>();
        for (Chords chrds: progressionChords) {
            chordNames.add(chrds.getName());
        }
        TopicChordProgression topicChordProgression = new TopicChordProgression(chordNames, topicProgressions.getTime());
        return topicChordProgression;
    }

    @Override
    public List<TopicChordChange> getChordChangesByTopicId(int topicId) {
        Session session = sessionFactory.getCurrentSession();
        Query<TopicChordChange> query = session.createQuery("select new com.projectnight.dto.TopicChordChange(changes.from.name, changes.to.name, tc.time) " +
                "from ChordChanges changes left join changes.topicAssoc tc " +
                "left join tc.topics t where t.id = :topicid", TopicChordChange.class);
        query.setParameter("topicid", topicId);
        List<TopicChordChange> chordChanges = query.getResultList();
        return chordChanges;
    }

    @Override
    public List<TopicChord> getChordsByTopicId(int topicId) {
        Session session = sessionFactory.getCurrentSession();
        Query<TopicChord> query = session.createQuery("select new com.projectnight.dto.TopicChord(chords.name, tc.time) " +
                "from Chords chords left join chords.topicAssoc tc " +
                "left join tc.topics top where top.id =:topicid", TopicChord.class);
        query.setParameter("topicid", topicId);
        List<TopicChord> chords = query.getResultList();
        return chords;
    }
}
