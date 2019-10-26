package com.locker.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;

@RestController
@RequestMapping("/secured/files")
public class FileUploadController {

    @Autowired
    private EntityManager entityManager;

    @GetMapping
    public String getAllUploadedFiles() {

        String s = "you are accessing a secured endpoint with userId " + CurrentRequestUser.securedUser.userId;

        return s;
    }

}
