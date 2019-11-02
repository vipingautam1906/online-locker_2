package com.locker.security.entity;

public class Security {

    public Integer id;
    public Integer userId;
    public Integer accessToken;

    public Security() {}

    public Security(Object[] u) {
        this.id = (Integer) u[0];
        this.userId = (Integer) u[1];
        this.accessToken = (Integer) u[2];
    }
}
