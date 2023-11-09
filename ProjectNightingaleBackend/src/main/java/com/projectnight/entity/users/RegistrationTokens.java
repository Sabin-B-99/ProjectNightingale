package com.projectnight.entity.users;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "registration_tokens")
public class RegistrationTokens {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;


    @Column(name = "token")
    private String token;

    @Column(name = "expiry_time")
    private LocalDateTime expiryTime;


    @Column(name = "confirmation_time")
    private LocalDateTime confirmationTime;

    @OneToOne
    @JoinColumn(name = "user_id")
    private Users users;

    public RegistrationTokens() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getExpiryTime() {
        return expiryTime;
    }

    public void setExpiryTime(LocalDateTime expiryTime) {
        this.expiryTime = expiryTime;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

    public LocalDateTime getConfirmationTime() {
        return confirmationTime;
    }

    public void setConfirmationTime(LocalDateTime confirmationTime) {
        this.confirmationTime = confirmationTime;
    }
}
