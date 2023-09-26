package com.projectnight.service.practice;

import com.projectnight.entity.practice.ChordChanges;
import com.projectnight.entity.practice.Topics;
import com.projectnight.entity.songs.Chords;
import com.projectnight.entity.songs.primarykeys.ChordsPK;
import com.projectnight.repository.practice.ChordChangesRepository;
import com.projectnight.service.songs.ChordsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class ChordChangesServiceImpl implements ChordChangesService {

    private final ChordChangesRepository chordChangesRepository;
    private final TopicsService topicsService;
    private final ChordsService chordsService;

    @Autowired
    public ChordChangesServiceImpl(ChordChangesRepository chordChangesRepository, ChordsService chordsService,
                                   TopicsService topicsService) {
        this.chordChangesRepository = chordChangesRepository;
        this.topicsService = topicsService;
        this.chordsService = chordsService;
    }

    @Override
    @Transactional
    public ChordChanges getChordChangeById(int id) {
        return this.chordChangesRepository.findById(id)
                .orElseThrow(
                        () -> {
                            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Chord change not found");
                        }
                );
    }

    @Override
    @Transactional
    public List<ChordChanges> getAllChordChanges() {
        return this.chordChangesRepository.findAll();
    }

    @Override
    @Transactional
    public void removeChordChangeById(int id){
        this.chordChangesRepository.deleteById(id);
    }

    @Override
    @Transactional
    public ChordChanges addTopicChordChange(int topicId, List<ChordsPK> changesPrimaryKeys) {
        Chords changeFrom = this.chordsService.getChordById(changesPrimaryKeys.get(0));
        changeFrom.setChordRootName(this.chordsService.getChordRootNameById(changesPrimaryKeys.get(0)));
        changeFrom.setChordKeyName(this.chordsService.gerChordKeyNameById(changesPrimaryKeys.get(0)));

        Chords changeTo = this.chordsService.getChordById(changesPrimaryKeys.get(1));
        changeTo.setChordRootName(this.chordsService.getChordRootNameById(changesPrimaryKeys.get(1)));
        changeTo.setChordKeyName(this.chordsService.gerChordKeyNameById(changesPrimaryKeys.get(1)));

        ChordChanges chordChanges = new ChordChanges();
        chordChanges.setChangeFrom(changeFrom);
        chordChanges.setChangeTo(changeTo);

        Topics topic = topicsService.getTopicById(topicId);

        chordChanges.setTopic(topic);
        topic.getTopicChordChanges().add(chordChanges);
        return chordChangesRepository.save(chordChanges);
    }

    @Override
    public List<ChordChanges> getChordChangesByTopicId(int topicId) {
        Topics topic = topicsService.getTopicById(topicId);
        return chordChangesRepository.getChordChangesByTopicOrderByTopicId(topic);
    }
}
