package com.projectnight.entity.practice;


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

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "topic_id", referencedColumnName = "id")
    private List<ChordChanges> topicChordChanges;


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
}
