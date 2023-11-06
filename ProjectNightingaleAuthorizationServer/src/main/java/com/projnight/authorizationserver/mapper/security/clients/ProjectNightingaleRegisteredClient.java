package com.projnight.authorizationserver.mapper.security.clients;

import com.projnight.authorizationserver.entity.clients.*;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.oauth2.server.authorization.settings.OAuth2TokenFormat;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.List;
import java.util.Set;
import java.util.function.Consumer;
import java.util.stream.Collectors;

@Component
public class ProjectNightingaleRegisteredClient {

    public ProjectNightingaleRegisteredClient() {
    }


    public RegisteredClient fromClients(Clients client){
        return RegisteredClient.withId(client.getId())
                .clientId(client.getClientId())
                .clientSecret(client.getClientSecret())
                .scopes(scopes(client.getScopes()))
                .clientAuthenticationMethods(clientAuthenticationMethods(client.getAuthenticationMethods()))
                .authorizationGrantTypes(clientAuthorizationGrantTypes(client.getGrantTypes()))
                .redirectUris(redirectUris(client.getRedirectUrls()))
                .tokenSettings(TokenSettings
                        .builder()
                        .accessTokenTimeToLive(Duration.ofMinutes(client.getClientTokenSettings().getAccessTokenTtlInMinutes()))
                        .refreshTokenTimeToLive(Duration.ofMinutes(client.getClientTokenSettings().getRefreshTokenTtlInMinutes()))
                        .accessTokenFormat(new OAuth2TokenFormat(client.getClientTokenSettings().getTokenType()))
                        .build())
                .clientSettings(ClientSettings
                        .builder()
                        .requireAuthorizationConsent(true)
                        .build())
                .build();
    }

    public Clients fromRegisteredClients(RegisteredClient registeredClient){
        Clients clients = new Clients();

        clients.setId(registeredClient.getId());
        clients.setClientId(registeredClient.getClientId());
        clients.setClientSecret(registeredClient.getClientSecret());

        clients.setScopes(registeredClient.getScopes()
                .stream().map(s -> scopesFrom(s, clients))
                .collect(Collectors.toList()));

        clients.setAuthenticationMethods(registeredClient.getClientAuthenticationMethods()
                .stream().map(authMethod -> authenticationMethodsFrom(authMethod, clients))
                .collect(Collectors.toList()));

        clients.setGrantTypes(registeredClient.getAuthorizationGrantTypes()
                .stream()
                .map(authGrantType -> grantTypesFrom(authGrantType, clients))
                .collect(Collectors.toList()));

        clients.setRedirectUrls(registeredClient.getRedirectUris()
                .stream().map(url -> redirectUrlsFrom(url, clients))
                .collect(Collectors.toList()));


        clients.setClientTokenSettings(clientTokenSettingsFrom(registeredClient.getTokenSettings(), clients));

        return clients;
    }


    private Consumer<Set<String>> scopes(List<Scopes> scopes){
        return clientScopes -> {
            for (Scopes scope: scopes){
             clientScopes.add(scope.getScope());
            }
        };
    }

    private Consumer<Set<ClientAuthenticationMethod>> clientAuthenticationMethods(
            List<AuthenticationMethods> authenticationMethods
    ){
        return clientAuthenticationMethods -> {
            for (AuthenticationMethods methods: authenticationMethods){
                clientAuthenticationMethods.add(new ClientAuthenticationMethod(methods.getAuthenticationMethod()));
            }
        };
    }

    private Consumer<Set<AuthorizationGrantType>> clientAuthorizationGrantTypes(List<GrantTypes> grantTypes){
        return clientAuthorizationGrantTypes -> {
            for (GrantTypes grantType: grantTypes){
                clientAuthorizationGrantTypes.add(new AuthorizationGrantType(grantType.getGrantType()));
            }
        };
    }

    private Consumer<Set<String>> redirectUris(List<RedirectUrls> redirectUrls){
        return clientRedirectUris -> {
            for (RedirectUrls redirectUrl:
                 redirectUrls) {
                clientRedirectUris.add(redirectUrl.getUrl());
            }
        };
    }



    private GrantTypes grantTypesFrom(AuthorizationGrantType authorizationGrantType, Clients clients){
        GrantTypes grantTypes = new GrantTypes();
        grantTypes.setGrantType(authorizationGrantType.getValue());
        grantTypes.setClients(clients);
        return grantTypes;
    }

    private Scopes scopesFrom(String scope, Clients clients){
        Scopes scopes = new Scopes();
        scopes.setScope(scope);
        scopes.setClients(clients);
        return scopes;
    }

    private AuthenticationMethods authenticationMethodsFrom(ClientAuthenticationMethod clientAuthenticationMethod,
                                                            Clients clients){
        AuthenticationMethods authenticationMethods = new AuthenticationMethods();
        authenticationMethods.setAuthenticationMethod(clientAuthenticationMethod.getValue());
        authenticationMethods.setClients(clients);
        return authenticationMethods;
    }

    private RedirectUrls redirectUrlsFrom(String redirectUri, Clients clients){
        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setUrl(redirectUri);
        redirectUrls.setClients(clients);
        return redirectUrls;
    }

    private ClientTokenSettings clientTokenSettingsFrom(TokenSettings tokenSettings, Clients clients){
        ClientTokenSettings clientTokenSettings = new ClientTokenSettings();
        clientTokenSettings.setAccessTokenTtlInMinutes(tokenSettings.getAccessTokenTimeToLive().toMinutes());
        clientTokenSettings.setRefreshTokenTtlInMinutes(tokenSettings.getRefreshTokenTimeToLive().toMinutes());
        clientTokenSettings.setTokenType(tokenSettings.getAccessTokenFormat().getValue());
        clientTokenSettings.setClients(clients);
        return clientTokenSettings;
    }
}
