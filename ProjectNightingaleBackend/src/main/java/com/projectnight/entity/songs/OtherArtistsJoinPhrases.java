package com.projectnight.entity.songs;

import javax.persistence.*;

@Entity
@Table(name = "other_artists_join_phrases")
public class OtherArtistsJoinPhrases {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "join_phrase")
    private String joinPhrase;

    public OtherArtistsJoinPhrases() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getJoinPhrase() {
        return joinPhrase;
    }

    public void setJoinPhrase(String joinPhrase) {
        this.joinPhrase = joinPhrase;
    }
}
