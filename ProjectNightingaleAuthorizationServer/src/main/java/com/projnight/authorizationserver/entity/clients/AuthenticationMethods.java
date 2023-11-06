package com.projnight.authorizationserver.entity.clients;

import jakarta.persistence.*;

@Entity
@Table(name = "authentication_methods")
public class AuthenticationMethods {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;


    @Column(name = "authentication_method")
    private String authenticationMethod;


    @ManyToOne
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    private Clients clients;


    public AuthenticationMethods() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getAuthenticationMethod() {
        return authenticationMethod;
    }

    public void setAuthenticationMethod(String authenticationMethod) {
        this.authenticationMethod = authenticationMethod;
    }

    public Clients getClients() {
        return clients;
    }

    public void setClients(Clients clients) {
        this.clients = clients;
    }
}
