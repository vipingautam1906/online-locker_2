package com.locker.user.entities;

import java.util.Date;

public class Security {

    public Integer userId;
    public Integer accessToken;
    public Date expiryTimestamp;

    public Security() {}

    public Security(Object[] u) {
        this.userId = (Integer) u[0];
        this.accessToken = (Integer) u[1];
        this.expiryTimestamp = (Date) u[2];
    }
}
