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

    //unidirectional by design
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "topic_id", referencedColumnName = "id")
    private List<ChordChanges> topicChordChanges;


    //Unidirectional by design
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "topic_chords",
            joinColumns = {@JoinColumn(name = "topic_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "chord_root_order", referencedColumnName = "chord_root_order"),
                    @JoinColumn(name = "chord_key_id", referencedColumnName = "chord_key_id")}
    )
    private List<Chords> chords;


    //unidirectional by design
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "topic_id", referencedColumnName = "id")
    private List<StrumPatterns> strumPatterns;

    @OneToOne(mappedBy = "topics", fetch = FetchType.LAZY)
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

    public Metronomes getMetronomes() {
        return metronomes;
    }

    public void setMetronomes(Metronomes metronomes) {
        this.metronomes = metronomes;
    }

    public List<StrumPatterns> getStrumPatterns() {
        return strumPatterns;
    }

    public void setStrumPatterns(List<StrumPatterns> strumPatterns) {
        this.strumPatterns = strumPatterns;
    }
}
