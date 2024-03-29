package com.projectnight.entity.practice;


import com.projectnight.entity.songs.Chords;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "topics")
public class Topics {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "song_title")
    private String songTitle;

    @Column(name = "time_duration")
    private long timeDuration;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "routine_id", referencedColumnName = "id")
    private Routines routine;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "topic")
    private List<ChordChanges> topicChordChanges;


    @ManyToMany
    @JoinTable(
            name = "topic_chords",
            joinColumns = {@JoinColumn(name = "topic_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "chord_root_order", referencedColumnName = "chord_root_order"),
                    @JoinColumn(name = "chord_key_id", referencedColumnName = "chord_key_id")}
    )
    private List<Chords> chords;


    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "topic")
    private List<StrumPatterns> strumPatterns;

    @OneToOne(mappedBy = "topics", cascade = CascadeType.ALL, orphanRemoval = true)
    private Metronomes metronomes;


    public Topics() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSongTitle() {
        return songTitle;
    }

    public void setSongTitle(String songTitle) {
        this.songTitle = songTitle;
    }

    public long getTimeDuration() {
        return timeDuration;
    }

    public void setTimeDuration(long timeDuration) {
        this.timeDuration = timeDuration;
    }

    public List<ChordChanges> getTopicChordChanges() {
        return topicChordChanges;
    }

    public void setTopicChordChanges(List<ChordChanges> topicChordChanges) {
        this.topicChordChanges = topicChordChanges;
    }

    public List<Chords> getChords() {
        return chords;
    }

    public void setChords(List<Chords> chords) {
        this.chords = chords;
    }

    public List<StrumPatterns> getStrumPatterns() {
        return strumPatterns;
    }

    public void setStrumPatterns(List<StrumPatterns> strumPatterns) {
        this.strumPatterns = strumPatterns;
    }

    public Routines getRoutine() {
        return routine;
    }

    public void setRoutine(Routines routine) {
        this.routine = routine;
    }

    public Metronomes getMetronomes() {
        return metronomes;
    }

    public void setMetronomes(Metronomes metronomes) {
        this.metronomes = metronomes;
    }
}
