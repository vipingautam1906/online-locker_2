package com.locker.user;

import com.locker.file.entity.UploadedFile;
import com.locker.user.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private EntityManager entityManager;

    public List<UploadedFile> getAll(Integer userId) {

        Query q = entityManager.createNativeQuery("SELECT * FROM uploaded_file WHERE user_id = ?")
                .setParameter(1, userId);
        List<Object[]> uploadedFilesRes = q.getResultList();

        List<UploadedFile> allUploadedFiles = new ArrayList<UploadedFile>(); // add all db users in this list.
        for (Object[] uf : uploadedFilesRes) {
            UploadedFile u = new UploadedFile(uf);
            allUploadedFiles.add(u);
        }
        return allUploadedFiles;

    }

    public void save(UploadedFile up) {
        entityManager.createNativeQuery("INSERT INTO uploaded_file (id, user_id, file_name, relative_path) VALUES (?, ?, ?, ?)")
                .setParameter(1, up.id)
                .setParameter(2, up.userId)
                .setParameter(3, up.fileName)
                .setParameter(4, up.relativePath)
                .executeUpdate();
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

    public void deleteById(Integer fileId) {
        entityManager.createNativeQuery("DELETE FROM uploaded_file WHERE id = ?")
                .setParameter(1, fileId)
                .executeUpdate();
    }

}
