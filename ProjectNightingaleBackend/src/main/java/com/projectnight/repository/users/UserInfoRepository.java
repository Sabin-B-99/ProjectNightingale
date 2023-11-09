package com.projectnight.repository.users;

import com.projectnight.entity.users.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserInfoRepository extends JpaRepository<UserInfo, Integer> {

    @Query("""
        SELECT info FROM UserInfo info WHERE info.email = :email
    """)
    Optional<UserInfo> findByEmail(@Param(value = "email") String email);
}
