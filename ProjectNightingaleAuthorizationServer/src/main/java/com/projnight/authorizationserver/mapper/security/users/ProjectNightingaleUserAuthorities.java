package com.projnight.authorizationserver.mapper.security.users;

import com.projnight.authorizationserver.entity.users.UserAuthorities;
import org.springframework.security.core.GrantedAuthority;

public class ProjectNightingaleUserAuthorities implements GrantedAuthority {

    private final UserAuthorities authorities;

    public ProjectNightingaleUserAuthorities(UserAuthorities authorities) {
        this.authorities = authorities;
    }

    @Override
    public String getAuthority() {
        return authorities.getAuthority();
    }
}
