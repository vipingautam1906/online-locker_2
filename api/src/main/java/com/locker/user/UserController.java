package com.locker.user;

import com.locker.user.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

/**
 * UserController helps a person to create a new user and fetch all
 * users from the system.
 */
@RestController
@RequestMapping("/public/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    /**
     * userRepository call will be made to pull all the users in the system.
     * @return
     */
    @GetMapping
    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public List<User> fetchAllUsers() {
        return userRepository.getAll();
    }

    /**
     * this endpoint helps to create a new user based on given emaild,
     * password, firstName, lastName.
     * @param user
     * @return the created user entity object with id associated with that.
     */
    @PostMapping
    @Transactional
    public ResponseEntity<User> saveUser(@RequestBody User user) {
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }
}
