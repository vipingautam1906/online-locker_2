package com.locker.file;

import com.locker.file.entity.UploadedFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

@Service
public class UploadedFileRepository {

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

    public UploadedFile getByIdAndUserId(Integer fileId, Integer userId) {
        Query q = entityManager.createNativeQuery("SELECT * FROM uploaded_file WHERE id = ? AND user_id = ?")
                .setParameter(1, fileId)
                .setParameter(2, userId);
        List<Object[]> uploadedFilesRes = q.getResultList();

        if (uploadedFilesRes.isEmpty())
            throw new RuntimeException("Uploaded file Id " + fileId + " doesn't exists for this user");

        return new UploadedFile(uploadedFilesRes.get(0));
    }

    public void deleteById(Integer fileId) {
        entityManager.createNativeQuery("DELETE FROM uploaded_file WHERE id = ?")
                .setParameter(1, fileId)
                .executeUpdate();
    }
}
