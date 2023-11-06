package com.projnight.authorizationserver.service.security.clients;

import com.projnight.authorizationserver.exception.ClientNotFoundException;
import com.projnight.authorizationserver.mapper.security.clients.ProjectNightingaleRegisteredClient;
import com.projnight.authorizationserver.repository.clients.ClientsRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProjectNightingaleRegisteredClientService implements RegisteredClientRepository {

    private final ClientsRepository clientsRepository;
    private final ProjectNightingaleRegisteredClient projectNightingaleRegisteredClient;

    public ProjectNightingaleRegisteredClientService(ClientsRepository clientsRepository,
                                                     ProjectNightingaleRegisteredClient projectNightingaleRegisteredClient) {
        this.clientsRepository = clientsRepository;
        this.projectNightingaleRegisteredClient = projectNightingaleRegisteredClient;
    }

    @Override
    public void save(RegisteredClient registeredClient) {
        clientsRepository.save(projectNightingaleRegisteredClient.fromRegisteredClients(registeredClient));
    }

    @Override
    @Transactional
    public RegisteredClient findById(String id) {
        return clientsRepository.findById(id)
                .map(projectNightingaleRegisteredClient::fromClients)
                .orElseThrow(() -> new ClientNotFoundException("Client not registered", HttpStatus.NOT_FOUND));
    }

    @Override
    @Transactional
    public RegisteredClient findByClientId(String clientId) {
        return clientsRepository.findByClientId(clientId)
                .map(projectNightingaleRegisteredClient::fromClients)
                .orElseThrow( () ->  new ClientNotFoundException("Client not registered", HttpStatus.NOT_FOUND));
    }
}
