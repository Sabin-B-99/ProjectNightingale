package com.projectnight.service.users;

import com.projectnight.entity.users.Users;
import com.projectnight.repository.users.UsersRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UsersServiceImpl implements UsersService{

    private final UsersRepository usersRepository;

    public UsersServiceImpl(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @Override
    @Transactional("userRegistrationTransactionManager")
    public Users saveUser(Users user) {
        return usersRepository.save(user);
    }
}
