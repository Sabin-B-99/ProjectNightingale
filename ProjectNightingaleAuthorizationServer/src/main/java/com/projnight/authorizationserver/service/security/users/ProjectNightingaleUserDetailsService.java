package com.projnight.authorizationserver.service.security.users;

import com.projnight.authorizationserver.mapper.security.users.ProjectNightingaleUserDetails;
import com.projnight.authorizationserver.repository.users.UsersRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProjectNightingaleUserDetailsService implements UserDetailsService {

    private final UsersRepository usersRepository;

    public ProjectNightingaleUserDetailsService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usersRepository.findUsersByUsername(username)
                .map(ProjectNightingaleUserDetails::new)
                .orElseThrow( () -> new UsernameNotFoundException("User " + username+ " not found."));
    }
}
