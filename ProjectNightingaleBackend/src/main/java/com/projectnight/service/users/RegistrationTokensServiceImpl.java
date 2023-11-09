package com.projectnight.service.users;

import com.nimbusds.jose.util.Base64;
import com.projectnight.entity.users.RegistrationTokens;
import com.projectnight.entity.users.Users;
import com.projectnight.repository.users.RegistrationTokensRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class RegistrationTokensServiceImpl implements RegistrationTokensService {

    private final RegistrationTokensRepository tokensRepository;

    public RegistrationTokensServiceImpl(RegistrationTokensRepository tokensRepository) {
        this.tokensRepository = tokensRepository;
    }

    @Override
    @Transactional("userRegistrationTransactionManager")
    public RegistrationTokens createRegistrationTokenForUser(Users user) {
        RegistrationTokens registrationToken = new RegistrationTokens();
        LocalDateTime expiryTime = LocalDateTime.now().plusDays(1);
        String token = Base64.encode(user.getUsername().concat(":").concat(expiryTime.toString())
                .getBytes(StandardCharsets.UTF_8)).toString();
        registrationToken.setExpiryTime(expiryTime);
        registrationToken.setToken(token);
        tokensRepository.save(registrationToken);
        return registrationToken;
    }

    @Override
    public Optional<RegistrationTokens> getRegistrationTokenByToken(String token) {
        return tokensRepository.getRegistrationTokensToken(token);
    }

    @Override
    public void removeTokenById(Integer id) {
        tokensRepository.deleteById(id);
    }
}
