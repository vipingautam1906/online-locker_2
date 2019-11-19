package com.locker.user.entities;

/**
 * Database app_user Entity class
 */
public class User {

    public Integer id;

    public String email;
    public String password;
    public String firstName;
    public String lastName;

    public User() {}

    public User(Object[] u) {
        this.id = (Integer) u[0];
        this.email = (String) u[1];
        this.password = (String) u[2];
        this.firstName = (String) u[3];
        this.lastName = (String) u[4];
    }
}
