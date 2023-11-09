package com.projectnight.service.users;

import com.projectnight.mapper.users.ProjectNightingaleUserDetails;
import com.projectnight.repository.users.UsersRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class ProjectNightingaleUserDetailsService implements UserDetailsService {
    private final UsersRepository usersRepository;

    public ProjectNightingaleUserDetailsService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.usersRepository.findByUsername(username)
                .map(ProjectNightingaleUserDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found in database"));
    }
}
