package com.projectnight.entity.users;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.projectnight.entity.practice.Routines;
import com.projectnight.entity.songs.SongTabs;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
public class Users {

    @Id
    @GenericGenerator(name = "uuid-hibernate-generator", strategy = "org.hibernate.id.UUIDGenerator")
    @GeneratedValue(generator = "uuid-hibernate-generator")
    @Column(name = "id")
    @Type(type = "uuid-char")
    private UUID id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @OneToOne(mappedBy = "users", cascade = CascadeType.ALL)
    private UserAccountDetails userAccountDetails;

    @OneToOne(mappedBy = "users", cascade = CascadeType.ALL)
    private UserInfo userInfo;

    @ManyToMany(mappedBy = "users", cascade = CascadeType.ALL)
    private List<UserAuthorities> authorities;

    @OneToMany(mappedBy = "users", fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonIgnore
    private List<Routines> userRoutines;


    public Users() {
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserAccountDetails getUserAccountDetails() {
        return userAccountDetails;
    }

    public void setUserAccountDetails(UserAccountDetails userAccountDetails) {
        this.userAccountDetails = userAccountDetails;
    }

    public UserInfo getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(UserInfo userInfo) {
        this.userInfo = userInfo;
    }

    public List<UserAuthorities> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(List<UserAuthorities> authorities) {
        this.authorities = authorities;
    }


    public List<Routines> getUserRoutines() {
        return userRoutines;
    }

    public void setUserRoutines(List<Routines> userRoutines) {
        this.userRoutines = userRoutines;
    }

}
