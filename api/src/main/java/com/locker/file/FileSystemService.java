package com.locker.file;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileSystemService {

    private static String UPLOADED_FOLDER = "C://temp//";
    private Path fileStorageLocation;

    public Path write(MultipartFile file) {
        Path storedFilePath = null;
        try {

            // Get the file and save it somewhere
            byte[] bytes = file.getBytes();
            storedFilePath = Paths.get(UPLOADED_FOLDER + file.getOriginalFilename());
            Files.write(storedFilePath, bytes);

        } catch (IOException e) {
            e.printStackTrace();
        }
        return storedFilePath;
    }

    public Resource loadFileAsResource(String fileName) {
        this.fileStorageLocation = Paths.get(UPLOADED_FOLDER).toAbsolutePath().normalize();

        try {

            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new RuntimeException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new RuntimeException("File not found " + fileName, ex);
        }
    }

    public void removeFileAsResource(String fileName) {
        this.fileStorageLocation = Paths.get(UPLOADED_FOLDER).toAbsolutePath().normalize();

        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                boolean status = resource.getFile().delete();
                if (!status)
                    throw new RuntimeException("File " + fileName + " could not be removed");
            } else {
                throw new RuntimeException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new RuntimeException("File not found " + fileName, ex);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
