package com.projectnight.service.practice;

import com.projectnight.entity.practice.Routines;
import com.projectnight.entity.practice.Topics;
import com.projectnight.entity.users.Users;
import com.projectnight.repository.practice.RoutinesRepository;
import com.projectnight.repository.practice.TopicsRepository;
import com.projectnight.service.users.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class RoutinesServiceImpl implements RoutinesService{

    private final RoutinesRepository routinesRepository;
    private final UsersService usersService;

    public RoutinesServiceImpl(RoutinesRepository routinesRepository, UsersService usersService) {
        this.routinesRepository = routinesRepository;
        this.usersService = usersService;
    }

    @Override
    @Transactional("practiceTransactionManager")
    public Routines getRoutineById(int id) {
        return this.routinesRepository.findById(id)
                .orElseThrow(
                        () ->{
                            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Routine not found.");
                        }
                );
    }

    @Override
    @Transactional("practiceTransactionManager")
    public List<Routines> getAllRoutines() {
        return this.routinesRepository.findAll();
    }

    @Override
    @Transactional("practiceTransactionManager")
    public List<Topics> getRoutineTopicsByRoutineId(int routineId) {
        return this.routinesRepository.getRoutineTopicsByRoutineId(routineId);
    }

    @Override
    @Transactional("practiceTransactionManager")
    public Routines saveRoutineForUser(Routines routine, String username) {
        Users users  = this.usersService.loadUserByUserName(username);
        routine.setUsers(users);
        return this.routinesRepository.save(routine);
    }

    @Override
    @Transactional("practiceTransactionManager")
    public void deleteRoutineById(int routineId) {
        this.routinesRepository.deleteById(routineId);
    }


    @Override
    @Transactional("practiceTransactionManager")
    public List<Routines> getAllRoutinesForUser(String username) {
        Users users = usersService.loadUserByUserName(username);
        return routinesRepository.findRoutinesByUserId(users.getId());
    }
}
