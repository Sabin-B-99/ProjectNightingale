package com.projectnight.entity.songs;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.projectnight.entity.users.Users;

import javax.persistence.*;

@Entity
@Table(name = "tab_ratings")
public class TabRatings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;


    @Column(name = "rating")
    private int rating;

    @ManyToOne
    @JoinColumn(name = "tab_id", referencedColumnName = "id")
    private SongTabs songTab;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private Users users;


    public TabRatings() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }


    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public SongTabs getSongTab() {
        return songTab;
    }

    public void setSongTab(SongTabs songTab) {
        this.songTab = songTab;
    }
}
