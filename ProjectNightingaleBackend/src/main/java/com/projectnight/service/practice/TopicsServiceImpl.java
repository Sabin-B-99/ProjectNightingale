package com.projectnight.service.practice;

import com.projectnight.entity.practice.Routines;
import com.projectnight.entity.practice.Topics;
import com.projectnight.entity.songs.Chords;
import com.projectnight.entity.songs.primarykeys.ChordsPK;
import com.projectnight.repository.practice.MetronomesRepository;
import com.projectnight.repository.practice.RoutinesRepository;
import com.projectnight.repository.practice.TopicsRepository;
import com.projectnight.repository.songs.ChordsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TopicsServiceImpl implements TopicsService{

    private final TopicsRepository topicsRepository;
    private final MetronomesRepository metronomesRepository;
    private final ChordsRepository chordsRepository;

    private final RoutinesRepository routinesRepository;
    @Autowired
    public TopicsServiceImpl(TopicsRepository topicsRepository, ChordsRepository chordsRepository,
                             MetronomesRepository metronomesRepository, RoutinesRepository routinesRepository) {
        this.topicsRepository = topicsRepository;
        this.chordsRepository = chordsRepository;
        this.metronomesRepository = metronomesRepository;
        this.routinesRepository = routinesRepository;
    }

    @Override
    @Transactional
    public Topics getTopicById(int id) {
        return topicsRepository.findById(id)
                .orElseThrow(
                        () ->{
                            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Topic not found.");
                        }
                );
    }

    @Override
    @Transactional
    public List<Topics> getAllTopics() {
        return topicsRepository.findAll();
    }

    @Override
    @Transactional
    public Topics addTopicChord(int topicId, ChordsPK topicChordPk) {
       Topics topic = this.topicsRepository.findById(topicId)
               .orElseThrow( ()->{
                           throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Topic not found.");
                       });
       Chords addedChord = chordsRepository.findById(topicChordPk)
                       .orElseThrow(
                               ()->{
                                   throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                                           "Chord not found.");
                               }
                       );
       topic.getChords().add(addedChord);
       return topicsRepository.save(topic);
    }

    @Override
    @Transactional
    public List<Chords> getChordsByTopicId(int topicId) {
        return topicsRepository.getChordsByTopic(topicId);
    }

    @Override
    @Transactional
    public Topics saveTopic(int routineId, Topics topic) {
        Routines routine = this.routinesRepository.findById(routineId)
                .orElseThrow(() ->{
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Routine with the given id not found");
                });
        topic.setRoutine(routine);
        return this.topicsRepository.save(topic);
    }

}
