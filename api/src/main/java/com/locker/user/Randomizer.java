package com.locker.user;

import java.util.Random;

public class Randomizer {
    private static Random random = new Random();

    public static Integer generateInt() {
        return random.nextInt();
    }
}
