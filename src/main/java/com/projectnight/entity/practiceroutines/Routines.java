package com.projectnight.entity.practiceroutines;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "routine")
public class Routines {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "title")
    private String title;


    @OneToMany(mappedBy = "routines")
    private List<RoutineTopic> topicsAssoc;


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

    public List<RoutineTopic> getTopicsAssoc() {
        return topicsAssoc;
    }

    public void setTopicsAssoc(List<RoutineTopic> topicsAssoc) {
        this.topicsAssoc = topicsAssoc;
    }
}
