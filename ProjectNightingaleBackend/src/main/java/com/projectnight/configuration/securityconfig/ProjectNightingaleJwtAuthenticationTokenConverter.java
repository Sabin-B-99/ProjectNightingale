package com.projectnight.configuration.securityconfig;


import org.springframework.core.convert.converter.Converter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.List;

public class ProjectNightingaleJwtAuthenticationTokenConverter implements Converter<Jwt, JwtAuthenticationToken> {

    @Override
    public JwtAuthenticationToken convert(Jwt source) {
        List<String> authorityList = (List<String>) source.getClaims().get("authorities");

        JwtAuthenticationToken authObject = new JwtAuthenticationToken(source,
                authorityList.stream().map(SimpleGrantedAuthority::new).toList());
        return authObject;
    }
}
