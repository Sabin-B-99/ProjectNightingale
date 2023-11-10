package com.projnight.authorizationserver.mapper.security.users;

import com.projnight.authorizationserver.entity.users.Users;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class ProjectNightingaleUserDetails implements UserDetails {

    private final Users users;

    public ProjectNightingaleUserDetails(Users users) {
        this.users = users;
    }

    @Override
    public String getPassword() {
        return users.getPassword();
    }

    @Override
    public String getUsername() {
        return users.getUsername();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }


    @Override
    public boolean isAccountNonExpired() {
        return users.getUserAccountDetails().isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return users.getUserAccountDetails().isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return users.getUserAccountDetails().isAccountNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return users.getUserAccountDetails().isAccountEnabled();
    }
}
