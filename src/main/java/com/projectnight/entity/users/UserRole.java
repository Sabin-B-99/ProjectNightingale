package com.projectnight.entity.users;

import com.projectnight.entity.users.embeddedPK.UserRolePK;

import javax.persistence.*;

@Entity
@Table(name = "userRole")
public class UserRole {

    @EmbeddedId
    private UserRolePK id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    public UserRole() {
    }

    public UserRolePK getId() {
        return id;
    }

    public void setId(UserRolePK id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
