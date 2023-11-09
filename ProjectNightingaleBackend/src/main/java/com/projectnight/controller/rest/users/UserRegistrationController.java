package com.projectnight.controller.rest.users;

import com.projectnight.dto.users.UserDTO;
import com.projectnight.dto.users.UserRegistrationDTO;
import com.projectnight.service.users.UserRegistrationService;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:4200/")
@RequestMapping(value = "/api/users")
public class UserRegistrationController {

    private final UserRegistrationService userRegistrationService;

    public UserRegistrationController(UserRegistrationService userRegistrationService) {
        this.userRegistrationService = userRegistrationService;
    }

    @PostMapping( value = "/register", produces = MediaType.APPLICATION_JSON_VALUE,
            consumes = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody UserDTO registerUser(@RequestBody UserRegistrationDTO userRegistrationDTO){
        return userRegistrationService.registerUser(userRegistrationDTO);
    }

    @PostMapping(value = "/confirm")
    private @ResponseBody UserDTO confirmUser(@RequestParam("token") String registrationToken){
        return userRegistrationService.confirmUserRegistration(registrationToken);
    }
}
