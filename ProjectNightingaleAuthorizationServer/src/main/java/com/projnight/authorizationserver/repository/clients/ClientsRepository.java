package com.projnight.authorizationserver.repository.clients;

import com.projnight.authorizationserver.entity.clients.Clients;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ClientsRepository extends JpaRepository<Clients, String> {

    @Query("""
        SELECT c FROM Clients c WHERE c.clientId = :clientId
    """)
    Optional<Clients> findByClientId(@Param("clientId") String clientId);
}
