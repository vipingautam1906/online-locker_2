package com.locker.user;

import com.locker.user.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/secured/users")
public class UserController {

    @Autowired
    private EntityManager entityManager;

    @GetMapping
    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public List<User> getAllUsers() {

        Query q = entityManager.createNativeQuery("SELECT * FROM app_user");
        List<Object[]> appUsers = q.getResultList();

        List<User> allUsers = new ArrayList<User>(); // add all db users in this list.
        for (Object[] a : appUsers) {
            User u = new User(a);
            allUsers.add(u);
        }
        return allUsers;
    }

    @PostMapping
    @Transactional
    public ResponseEntity<User> saveUser(@RequestBody User user) {

        Integer newUserId = new Random().nextInt();

        int resultResponse = entityManager.createNativeQuery("INSERT INTO app_user (id, email, password, first_name, last_name) VALUES (?, ?, ?, ?, ?)")
                .setParameter(1, newUserId)
                .setParameter(2, user.email)
                .setParameter(3, user.password)
                .setParameter(4, user.firstName)
                .setParameter(5, user.lastName)
                .executeUpdate();
        System.out.println(" insert db response " + resultResponse);


        user.id = newUserId;

        return ResponseEntity.ok(user);

    }

    @GetMapping("/justTest")
    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public List<String> saveUser() {
        return Arrays.asList("First", "Second", "Third");
    }
}
