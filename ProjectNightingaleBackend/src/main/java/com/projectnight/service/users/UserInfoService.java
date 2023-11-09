package com.projectnight.service.users;

import com.projectnight.entity.users.UserInfo;

public interface UserInfoService {
    public UserInfo loadUserInfoByEmail(String email);
}
