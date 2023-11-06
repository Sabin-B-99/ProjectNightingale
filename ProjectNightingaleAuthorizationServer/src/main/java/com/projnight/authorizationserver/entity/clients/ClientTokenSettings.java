package com.projnight.authorizationserver.entity.clients;

import jakarta.persistence.*;

@Entity
@Table(name = "client_token_settings")
public class ClientTokenSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "access_token_ttl")
    private long accessTokenTtlInMinutes;

    @Column(name = "refresh_token_ttl")
    private long refreshTokenTtlInMinutes;

    @Column(name = "token_type")
    private String tokenType;

    @OneToOne
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    private Clients clients;


    public ClientTokenSettings() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public long getAccessTokenTtlInMinutes() {
        return accessTokenTtlInMinutes;
    }

    public void setAccessTokenTtlInMinutes(long accessTokenTtlInMinutes) {
        this.accessTokenTtlInMinutes = accessTokenTtlInMinutes;
    }

    public long getRefreshTokenTtlInMinutes() {
        return refreshTokenTtlInMinutes;
    }

    public void setRefreshTokenTtlInMinutes(long refreshTokenTtlInMinutes) {
        this.refreshTokenTtlInMinutes = refreshTokenTtlInMinutes;
    }

    public Clients getClients() {
        return clients;
    }

    public void setClients(Clients clients) {
        this.clients = clients;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }
}
