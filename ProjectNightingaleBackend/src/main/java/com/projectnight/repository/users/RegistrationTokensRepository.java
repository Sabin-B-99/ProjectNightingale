package com.projectnight.repository.users;

import com.projectnight.entity.users.RegistrationTokens;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface RegistrationTokensRepository extends JpaRepository<RegistrationTokens, Integer> {

    @Query("""
        SELECT t FROM RegistrationTokens t WHERE t.token = :token
    """)
    Optional<RegistrationTokens> getRegistrationTokensToken(@Param("token") String token);
}
