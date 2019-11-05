package com.locker.user;

import com.locker.user.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class UserService {

    @Autowired
    private EntityManager entityManager;

    public List<User> getAll() {

        Query q = entityManager.createNativeQuery("SELECT * FROM app_user");
        List<Object[]> appUsers = q.getResultList();

        List<User> allUsers = new ArrayList<User>(); // add all db users in this list.
        for (Object[] a : appUsers) {
            User u = new User(a);
            allUsers.add(u);
        }
        return allUsers;
    }

    public User save(User user) {
        Integer newUserId = new Random().nextInt();
        user.id = newUserId;

        int resultResponse = entityManager.createNativeQuery("INSERT INTO app_user (id, email, password, first_name, last_name) VALUES (?, ?, ?, ?, ?)")
                .setParameter(1, user.id)
                .setParameter(2, user.email)
                .setParameter(3, user.password)
                .setParameter(4, user.firstName)
                .setParameter(5, user.lastName)
                .executeUpdate();
        System.out.println(" insert db response " + resultResponse);
        return user;
    }

    public User getByEmailAndPassword(String email, String password) {

        Query q = entityManager.createNativeQuery("SELECT * FROM app_user WHERE email=? AND password=?")
                .setParameter(1, email)
                .setParameter(2, password);

        List<Object[]> appUsers = q.getResultList();

        if (appUsers.isEmpty())
            throw new RuntimeException("User with this email/password doesn't exists");

        return new User(appUsers.get(0));
    }
}
