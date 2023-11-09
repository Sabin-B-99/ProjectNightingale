package com.projectnight.service.users;

import com.projectnight.entity.users.Users;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UsersService {
    public Users saveUser(Users user);
}
