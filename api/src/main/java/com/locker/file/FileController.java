package com.locker.file;

import com.locker.file.entity.UploadedFile;
import com.locker.security.entity.CurrentRequestUser;
import com.locker.util.Randomizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/secured/files")
public class FileController {

    private static String UPLOADED_FOLDER = "C://temp//";

    @Autowired
    private EntityManager entityManager;

    @GetMapping
    public List<UploadedFile> getAllUploadedFiles() {

        Query q = entityManager.createNativeQuery("SELECT * FROM uploaded_file WHERE user_id = ?")
                .setParameter(1, CurrentRequestUser.securedUser.userId);
        List<Object[]> uploadedFilesRes = q.getResultList();

        List<UploadedFile> allUploadedFiles = new ArrayList<UploadedFile>(); // add all db users in this list.
        for (Object[] uf : uploadedFilesRes) {
            UploadedFile u = new UploadedFile(uf);
            allUploadedFiles.add(u);
        }
        return allUploadedFiles;
    }

    @PostMapping("/upload")
    @Transactional
    public UploadedFile singleFileUpload(@RequestParam("file") MultipartFile file) {

        if (file.isEmpty()) {
            throw new RuntimeException("Please provide a file to upload");
        }

        Path storedFilePath = null;
        try {

            // Get the file and save it somewhere
            byte[] bytes = file.getBytes();
            storedFilePath = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
            Files.write(storedFilePath, bytes);

        } catch (IOException e) {
            e.printStackTrace();
        }

        UploadedFile up = new UploadedFile();
        up.id = Randomizer.generateInt();
        up.userId = CurrentRequestUser.securedUser.userId;
        up.relativePath = storedFilePath.toAbsolutePath().toString();
        up.fileName = storedFilePath.getFileName().toString();

        int resultResponse = entityManager.createNativeQuery("INSERT INTO uploaded_file (id, user_id, file_name, relative_path) VALUES (?, ?, ?, ?)")
                .setParameter(1, up.id)
                .setParameter(2, up.userId)
                .setParameter(3, up.fileName)
                .setParameter(4, up.relativePath)
                .executeUpdate();

        return up;

    }

}
