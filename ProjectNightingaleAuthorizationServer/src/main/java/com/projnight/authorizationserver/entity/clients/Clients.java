package com.projnight.authorizationserver.entity.clients;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "clients")
public class Clients {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private String id;

    @Column(name = "client_id")
    private String clientId;

    @Column(name = "client_secret")
    private String clientSecret;

    @OneToMany(mappedBy = "clients", fetch = FetchType.EAGER)
    private List<GrantTypes> grantTypes;

    @OneToMany(mappedBy = "clients", fetch = FetchType.EAGER)
    private List<Scopes> scopes;

    @OneToMany(mappedBy = "clients", fetch = FetchType.EAGER)
    private List<RedirectUrls> redirectUrls;

    @OneToMany(mappedBy = "clients", fetch = FetchType.EAGER)
    private List<AuthenticationMethods> authenticationMethods;

    @OneToOne(mappedBy = "clients")
    private ClientTokenSettings clientTokenSettings;
    public Clients() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public List<GrantTypes> getGrantTypes() {
        return grantTypes;
    }

    public void setGrantTypes(List<GrantTypes> grantTypes) {
        this.grantTypes = grantTypes;
    }

    public List<Scopes> getScopes() {
        return scopes;
    }

    public void setScopes(List<Scopes> scopes) {
        this.scopes = scopes;
    }

    public List<RedirectUrls> getRedirectUrls() {
        return redirectUrls;
    }

    public void setRedirectUrls(List<RedirectUrls> redirectUrls) {
        this.redirectUrls = redirectUrls;
    }

    public List<AuthenticationMethods> getAuthenticationMethods() {
        return authenticationMethods;
    }

    public void setAuthenticationMethods(List<AuthenticationMethods> authenticationMethods) {
        this.authenticationMethods = authenticationMethods;
    }

    public ClientTokenSettings getClientTokenSettings() {
        return clientTokenSettings;
    }

    public void setClientTokenSettings(ClientTokenSettings clientTokenSettings) {
        this.clientTokenSettings = clientTokenSettings;
    }
}
