package com.projectnight.service.practice;

import com.projectnight.entity.practice.ChordChanges;
import com.projectnight.entity.practice.Metronomes;
import com.projectnight.entity.practice.StrumPatterns;
import com.projectnight.entity.practice.Topics;
import com.projectnight.entity.songs.Chords;
import com.projectnight.entity.songs.primarykeys.ChordsPK;
import com.projectnight.repository.practice.MetronomesRepository;
import com.projectnight.repository.practice.TopicsRepository;
import com.projectnight.repository.songs.ChordsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TopicsServiceImpl implements TopicsService{

    private final TopicsRepository topicsRepository;
    private final MetronomesRepository metronomesRepository;
    private final ChordsRepository chordsRepository;
    @Autowired
    public TopicsServiceImpl(TopicsRepository topicsRepository, ChordsRepository chordsRepository,
                             MetronomesRepository metronomesRepository) {
        this.topicsRepository = topicsRepository;
        this.chordsRepository = chordsRepository;
        this.metronomesRepository = metronomesRepository;
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
    public Topics addTopicChordChange(int topicId, List<ChordsPK> changesPrimaryKeys) {
        Chords changeFrom = this.chordsRepository.findById(changesPrimaryKeys.get(0))
                .orElseThrow(() ->{
                  throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                          "Change from chord not found.");
                });
        Chords changeTo = this.chordsRepository.findById(changesPrimaryKeys.get(1))
                .orElseThrow(()->{
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Change to chord not found.");
                });
        ChordChanges chordChanges = new ChordChanges();
        chordChanges.setChangeFrom(changeFrom);
        chordChanges.setChangeTo(changeTo);

        Topics topic = topicsRepository.findById(topicId)
                .orElseThrow(()->{
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Topic not found.");
                });
        chordChanges.setTopic(topic);
        topic.getTopicChordChanges().add(chordChanges);
        return topicsRepository.save(topic);
    }

    @Override
    @Transactional
    public Topics addTopicStrumPattern(int topicId, StrumPatterns strumPattern) {
        Topics topic = topicsRepository.findById(topicId)
                .orElseThrow(
                        () ->{
                            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Topic not found.");
                        }
                );
        strumPattern.setTopic(topic);
        topic.getStrumPatterns().add(strumPattern);
        return topicsRepository.save(topic);
    }

    @Override
    @Transactional
    public Metronomes addTopicMetronome(int topicId, Metronomes metronome) {
        Topics topic = topicsRepository.findById(topicId)
                .orElseThrow(
                        () ->{
                            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Topic not found.");
                        }
                );
        metronome.setTopics(topic);
        return metronomesRepository.save(metronome);
    }


}
