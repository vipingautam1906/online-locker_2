package com.locker.file.entity;

public class UploadedFile {

    public Integer id;
    public Integer userId;
    public String fileName;
    public String relativePath;

    public UploadedFile() {
    }

    public UploadedFile(Object[] u) {
        this.id = (Integer) u[0];
        this.userId = (Integer) u[1];
        this.fileName = (String) u[2];
        this.relativePath = (String) u[3];
    }
}
