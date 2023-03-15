package com.projectnight.dao;

import com.projectnight.entity.users.User;

import java.util.Optional;

public interface UserDAO {
    Optional<User> loadUserByUserName(String useName);
}
