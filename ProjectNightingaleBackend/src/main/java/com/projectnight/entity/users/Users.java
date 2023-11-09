package com.projectnight.entity.users;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class Users {

    @Id
    @GenericGenerator(name = "uuid-hibernate-generator", strategy = "org.hibernate.id.UUIDGenerator")
    @GeneratedValue(generator = "uuid-hibernate-generator")
    @Column(name = "id")
    @Type(type = "uuid-char")
    private String id;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    @OneToOne(mappedBy = "users")
    private UserAccountDetails userAccountDetails;

    @OneToOne(mappedBy = "users")
    private UserInfo userInfo;

    public Users() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
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
}
