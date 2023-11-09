package com.projectnight.service.users;

import com.projectnight.entity.users.RegistrationTokens;
import com.projectnight.entity.users.Users;

import java.util.Optional;

public interface RegistrationTokensService {

    public RegistrationTokens createRegistrationTokenForUser(Users user);

    public Optional<RegistrationTokens> getRegistrationTokenByToken(String token);

    public void removeTokenById(Integer id);
}
