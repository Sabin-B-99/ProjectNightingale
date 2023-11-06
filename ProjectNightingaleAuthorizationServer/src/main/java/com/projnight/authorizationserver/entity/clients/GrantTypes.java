package com.projnight.authorizationserver.entity.clients;

import jakarta.persistence.*;

@Entity
@Table(name = "grant_types")
public class GrantTypes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "grant_type")
    private String grantType;


    @ManyToOne
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    private Clients clients;


    public GrantTypes() {
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getGrantType() {
        return grantType;
    }

    public void setGrantType(String grantType) {
        this.grantType = grantType;
    }

    public Clients getClients() {
        return clients;
    }

    public void setClients(Clients clients) {
        this.clients = clients;
    }
}
