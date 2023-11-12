package com.projnight.authorizationserver.entity.users;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "authorities")
public class UserAuthorities {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;


    @Column(name = "authority")
    private String authority;

    @ManyToMany
    @JoinTable(name = "user_authorities",
            joinColumns = {@JoinColumn(name = "authority_id", referencedColumnName = "id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")})
    private List<Users> users;

    public UserAuthorities() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAuthority() {
        return authority;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public List<Users> getUsers() {
        return users;
    }

    public void setUsers(List<Users> users) {
        this.users = users;
    }
}
