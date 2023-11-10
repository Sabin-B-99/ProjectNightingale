package com.projectnight.repository.users;

import com.projectnight.entity.users.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface UsersRepository extends JpaRepository<Users, UUID> {
    @Query("""
    SELECT u FROM Users u WHERE u.username = :username
    """)
    Optional<Users> findByUsername(@Param("username") String username);
}
