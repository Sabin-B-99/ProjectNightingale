package com.projectnight.entity.practice;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.projectnight.entity.users.Users;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "routines")
public class Routines {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "title")
    private String title;

    @Column(name = "duration")
    private long duration;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, mappedBy = "routine", fetch = FetchType.LAZY)
    private List<Topics> topics;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private Users users;

    public Routines() {
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

    public long getDuration() {
        return duration;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public List<Topics> getTopics() {
        return topics;
    }

    public void setTopics(List<Topics> topics) {
        this.topics = topics;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }
}
