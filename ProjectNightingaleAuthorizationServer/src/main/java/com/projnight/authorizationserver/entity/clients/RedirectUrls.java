package com.projnight.authorizationserver.entity.clients;

import jakarta.persistence.*;

@Entity
@Table(name = "redirect_urls")
public class RedirectUrls {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;


    @Column(name = "url")
    private String url;

    @ManyToOne
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    private Clients clients;


    public RedirectUrls() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Clients getClients() {
        return clients;
    }

    public void setClients(Clients clients) {
        this.clients = clients;
    }
}
