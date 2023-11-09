package com.projectnight.service.users;

import com.projectnight.dto.users.UserDTO;
import com.projectnight.dto.users.UserRegistrationDTO;
import com.projectnight.entity.users.Users;

public interface UserRegistrationService {

    public UserDTO registerUser(UserRegistrationDTO users);
    public UserDTO confirmUserRegistration(String confirmationToken);

    public boolean usernameExists(String username);
    public boolean emailExists(String email);

}
