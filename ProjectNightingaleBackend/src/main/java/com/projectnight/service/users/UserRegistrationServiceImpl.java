package com.projectnight.service.users;

import com.projectnight.configuration.securityconfig.EmailValidator;
import com.projectnight.configuration.securityconfig.PasswordEncoder;
import com.projectnight.dto.users.UserDTO;
import com.projectnight.dto.users.UserRegistrationDTO;
import com.projectnight.entity.users.RegistrationTokens;
import com.projectnight.entity.users.UserAccountDetails;
import com.projectnight.entity.users.UserInfo;
import com.projectnight.entity.users.Users;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class UserRegistrationServiceImpl implements UserRegistrationService {

    @Value(value = "${user.registration.redirection.url.template}")
    private String mailRedirectId;
    private final UsersService usersService;
    private final UserInfoService userInfoService;
    private final PasswordEncoder passwordEncoder;
    private final RegistrationTokensService registrationTokensService;

    private final RegistrationEmailSenderService registrationEmailSenderService;
    private final EmailValidator emailValidator;

    public UserRegistrationServiceImpl(UsersService usersService, EmailValidator emailValidator,
                                       UserInfoService userInfoService,
                                       PasswordEncoder passwordEncoder,
                                       RegistrationTokensService registrationTokensService,
                                       RegistrationEmailSenderService registrationEmailSenderService) {
        this.usersService = usersService;
        this.userInfoService = userInfoService;
        this.passwordEncoder = passwordEncoder;
        this.registrationTokensService = registrationTokensService;
        this.registrationEmailSenderService = registrationEmailSenderService;
        this.emailValidator = emailValidator;
    }

    @Override
    public UserDTO registerUser(UserRegistrationDTO users) {
        if(!emailValidator.test(users.getEmail())){
            throw new RuntimeException("Invalid email");
        }
        if(usernameExists(users.getUsername())){
            throw new RuntimeException("Username already in use. Please use another.");
        }
        if(emailExists(users.getEmail())){
            throw new RuntimeException("Email already in use.");
        }

        Users savedUser = usersService.saveUser(buildUserToSave(users));
        RegistrationTokens tokens = registrationTokensService.createRegistrationTokenForUser(savedUser);

        registrationEmailSenderService.sendRegistrationEmail(savedUser.getUserInfo().getEmail(),
                savedUser.getUsername(), mailRedirectId.concat(tokens.getToken()));

        return new UserDTO(savedUser.getUsername());
    }


    @Override
    public UserDTO confirmUserRegistration(String confirmationToken) {
        Optional<RegistrationTokens> registrationTokens = registrationTokensService
                .getRegistrationTokenByToken(confirmationToken);

        if(registrationTokens.isEmpty()){
            throw new RuntimeException("Token not found");
        }

        if(registrationTokens.get().getExpiryTime().isBefore(LocalDateTime.now())){
            registrationTokensService.removeTokenById(registrationTokens.get().getId());
            throw new RuntimeException("Token expired");
        }

        if(registrationTokens.get().getConfirmationTime() != null){
            throw new RuntimeException("Email already confirmed. Please login.");
        }

        Users users = registrationTokens.get().getUsers();

        UserAccountDetails updatedAccountDetails = users.getUserAccountDetails();
        updatedAccountDetails.setAccountNonLocked(true);
        updatedAccountDetails.setAccountNonExpired(true);
        updatedAccountDetails.setCredentialsNonExpired(true);
        updatedAccountDetails.setAccountEnabled(true);

        users.setUserAccountDetails(updatedAccountDetails);

        usersService.saveUser(users);

        registrationTokensService.removeTokenById(registrationTokens.get().getId());

        return new UserDTO(users.getUsername());
    }


    @Override
    public boolean usernameExists(String username) {
        Users userDetails = null;
        try {
            userDetails = usersService.loadUserByUserName(username);
        }catch (UsernameNotFoundException ignored){
        }
        return userDetails != null;
    }

    @Override
    public boolean emailExists(String email) {
        UserInfo userInfo = null;
        try {
            userInfo = userInfoService.loadUserInfoByEmail(email);
        }catch (Exception ignored){
        }
        return userInfo != null;
    }
    private Users buildUserToSave(UserRegistrationDTO userRegistrationDTO){
        Users userToRegister = new Users();
        UserInfo userInfoToRegister = new UserInfo();
        UserAccountDetails userAccountDetails = new UserAccountDetails();

        userToRegister.setUsername(userRegistrationDTO.getUsername());
        userToRegister.setPassword(passwordEncoder.passwordEncoder()
                .encode(userRegistrationDTO.getPassword()));

        userInfoToRegister.setEmail(userRegistrationDTO.getEmail());
        userInfoToRegister.setFirstName(userRegistrationDTO.getFirstname());
        userInfoToRegister.setLastName(userRegistrationDTO.getLastname());
        userInfoToRegister.setUsers(userToRegister);

        userAccountDetails.setAccountEnabled(false);
        userAccountDetails.setCredentialsNonExpired(false);
        userAccountDetails.setAccountNonExpired(false);
        userAccountDetails.setAccountNonLocked(false);
        userAccountDetails.setUsers(userToRegister);

        userToRegister.setUserInfo(userInfoToRegister);
        userToRegister.setUserAccountDetails(userAccountDetails);

        return userToRegister;
    }

}
