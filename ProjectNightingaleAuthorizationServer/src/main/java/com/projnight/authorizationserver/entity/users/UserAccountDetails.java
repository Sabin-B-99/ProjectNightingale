package com.projnight.authorizationserver.entity.users;

import javax.persistence.*;

@Entity
@Table(name = "user_account_details")
public class UserAccountDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;


    @Column(name = "is_account_non_expired", nullable = false, columnDefinition = "TINYINT", length = 1)
    private boolean isAccountNonExpired;

    @Column(name = "is_account_non_locked", nullable = false, columnDefinition = "TINYINT", length = 1)
    private boolean isAccountNonLocked;

    @Column(name = "is_credentials_non_expired", nullable = false, columnDefinition = "TINYINT", length = 1)
    private boolean isCredentialsNonExpired;

    @Column(name = "is_account_enabled", nullable = false, columnDefinition = "TINYINT", length = 1)
    private boolean isAccountEnabled;

    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private Users users;

    public UserAccountDetails() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public boolean isAccountNonExpired() {
        return isAccountNonExpired;
    }

    public void setAccountNonExpired(boolean accountNonExpired) {
        isAccountNonExpired = accountNonExpired;
    }

    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }

    public void setAccountNonLocked(boolean accountNonLocked) {
        isAccountNonLocked = accountNonLocked;
    }

    public boolean isCredentialsNonExpired() {
        return isCredentialsNonExpired;
    }

    public void setCredentialsNonExpired(boolean credentialsNonExpired) {
        isCredentialsNonExpired = credentialsNonExpired;
    }

    public boolean isAccountEnabled() {
        return isAccountEnabled;
    }

    public void setAccountEnabled(boolean accountEnabled) {
        isAccountEnabled = accountEnabled;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }
}
