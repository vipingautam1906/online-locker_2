package com.locker.user;

import com.locker.user.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * UserRepository is solely designed for database operation based on given request.
 * person can pull all users, save a user, or search a user by its email and password.
 */
@Repository
public class UserRepository {

    /**
     * database query executor class helps in interacting with the database.
     */
    @Autowired
    private EntityManager entityManager;

    /**
     * this method do fetch all the app_user table records and create its
     * User object and add them all in a list, and finally return that list.
     * @return
     */
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

    /**
     * this method will given user object via insert statement in database. and
     * returned the saved entity
     * @param user
     * @return
     */
    public User save(User user) {
        Integer newUserId = new Random().nextInt();
        user.id = newUserId;

        int resultResponse = entityManager.createNativeQuery("INSERT INTO app_user" +
                " (id, email, password, first_name, last_name) VALUES (?, ?, ?, ?, ?)")
                .setParameter(1, user.id)
                .setParameter(2, user.email)
                .setParameter(3, user.password)
                .setParameter(4, user.firstName)
                .setParameter(5, user.lastName)
                .executeUpdate();
        System.out.println(" insert db response " + resultResponse);
        return user;
    }

    /**
     * this method checks the presence of email/password combination in app_user table.
     * if there is a combination exists it returns the user object. else throw exception.
     * @param email
     * @param password
     * @return fetched user object.
     */
    public User getByEmailAndPassword(String email, String password) {

        Query q = entityManager.createNativeQuery("SELECT * FROM app_user" +
                " WHERE email=? AND password=?")
                .setParameter(1, email)
                .setParameter(2, password);

        List<Object[]> appUsers = q.getResultList();

        if (appUsers.isEmpty())
            throw new RuntimeException("User with this email/password doesn't exists");

        return new User(appUsers.get(0));
    }
}
