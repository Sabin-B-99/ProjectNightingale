package com.projectnight.service.users;

import com.projectnight.entity.users.UserInfo;
import com.projectnight.repository.users.UserInfoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserInfoServiceImpl implements UserInfoService{

    private final UserInfoRepository userInfoRepository;


    public UserInfoServiceImpl(UserInfoRepository userInfoRepository) {
        this.userInfoRepository = userInfoRepository;
    }

    @Override
    @Transactional("userRegistrationTransactionManager")
    public UserInfo loadUserInfoByEmail(String email) {
        return this.userInfoRepository.findByEmail(email)
                .orElseThrow(()-> new RuntimeException("Email not found"));
    }
}
