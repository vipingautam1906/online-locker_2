package com.locker.user;

import com.locker.user.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/public/users")
public class UserController {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private UserService userService;

    @GetMapping
    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userService.getAll();
    }

    @PostMapping
    @Transactional
    public ResponseEntity<User> saveUser(@RequestBody User user) {

        User savedUser = userService.save(user);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/justTest")
    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public List<String> justTest() {
        return Arrays.asList("First", "Second", "Third");
    }
}
