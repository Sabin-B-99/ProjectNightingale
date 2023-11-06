package com.projnight.authorizationserver.repository.users;

import com.projnight.authorizationserver.entity.users.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, String> {

    @Query("SELECT u FROM Users u WHERE u.username = :username")
    Optional<Users> findUsersByUsername(@Param("username") String username);
}
