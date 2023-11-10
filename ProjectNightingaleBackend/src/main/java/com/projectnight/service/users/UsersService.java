package com.projectnight.service.users;

import com.projectnight.entity.users.Users;

public interface UsersService {
    public Users saveUser(Users user);
    public Users loadUserByUserName(String username);
}
