package com.projnight.authorizationserver.entity.clients;

import jakarta.persistence.*;

@Entity
@Table(name = "scopes")
public class Scopes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;


    @Column(name = "scope")
    private String scope;

    @ManyToOne
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    private Clients clients;


    public Scopes() {
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public Clients getClients() {
        return clients;
    }

    public void setClients(Clients clients) {
        this.clients = clients;
    }
}
