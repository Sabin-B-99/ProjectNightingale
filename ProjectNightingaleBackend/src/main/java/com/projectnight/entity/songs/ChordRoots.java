package com.projectnight.entity.songs;


import javax.persistence.*;

@Entity
@Table(name = "chord_roots")
public class ChordRoots {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "root_order")
    private int rootOrder;

    @Column(name = "root_name")
    private String rootName;

    public ChordRoots() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getRootOrder() {
        return rootOrder;
    }

    public void setRootOrder(int rootOrder) {
        this.rootOrder = rootOrder;
    }

    public String getRootName() {
        return rootName;
    }

    public void setRootName(String rootName) {
        this.rootName = rootName;
    }
}
