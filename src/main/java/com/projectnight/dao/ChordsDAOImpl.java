package com.projectnight.dao;

import com.projectnight.entity.practiceroutines.Chords;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ChordsDAOImpl implements ChordsDAO{

    @Autowired
    private SessionFactory sessionFactory;

    @Override
    public List<Chords> getChords() {
        Session session = sessionFactory.getCurrentSession();
        Query<Chords> query = session.createQuery("from Chords ", Chords.class);
        List<Chords> chords = query.getResultList();
        return chords;
    }

    @Override
    public void saveChord(Chords chord) {
        Session session = sessionFactory.getCurrentSession();
        session.saveOrUpdate(chord);
    }

    @Override
    public Chords getChord(int chordId) {
        Session session = sessionFactory.getCurrentSession();
        Chords chord = session.get(Chords.class, chordId);
        return chord;
    }

    @Override
    public void deleteChord(int chordId) {
        Session session = sessionFactory.getCurrentSession();
        Chords chord = session.get(Chords.class, chordId);
        session.delete(chord);
    }
}
