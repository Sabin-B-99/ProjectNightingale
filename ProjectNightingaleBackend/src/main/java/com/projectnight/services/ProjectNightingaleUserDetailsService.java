package com.projectnight.services;

import com.projectnight.dao.UserDAO;
import com.projectnight.dao.UserDAOImpl;
import com.projectnight.entity.users.User;
import com.projectnight.security.ProjectNightingaleSecureUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProjectNightingaleUserDetailsService implements UserDetailsService {

    @Autowired
    private  UserDAO userDAO;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userDAO.loadUserByUserName(username);
        return user.map(ProjectNightingaleSecureUser::new)
                .orElseThrow(() -> new UsernameNotFoundException("Username " + username + " not found."));
    }
}
