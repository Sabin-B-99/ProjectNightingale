package com.projectnight.service.users;

import com.projectnight.entity.users.Users;

import java.util.UUID;

public interface UsersService {
    public Users saveUser(Users user);
    public Users loadUserByUserName(String username);

    Users findByUserId(UUID id);
}
