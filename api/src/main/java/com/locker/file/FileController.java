package com.locker.file;

import com.locker.file.entity.UploadedFile;
import com.locker.security.entity.CurrentRequestUser;
import com.locker.util.Randomizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Path;
import java.util.List;

@RestController
@RequestMapping("/secured/files")
public class FileController {

    @Autowired
    private UploadedFileRepository uploadedFileRepository;

    @Autowired
    private FileSystemService fileSystemService;

    @GetMapping
    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public List<UploadedFile> getAllUploadedFiles() {
        return uploadedFileRepository.getAll(CurrentRequestUser.securedUser.userId);
    }

    @PostMapping("/upload")
    @Transactional
    public UploadedFile uploadFile(@RequestParam("file") MultipartFile file) {

        if (file.isEmpty()) {
            throw new RuntimeException("Please provide a file to upload");
        }

        Path storedFilePath = fileSystemService.write(file);

        UploadedFile up = new UploadedFile();
        up.id = Randomizer.generateInt();
        up.userId = CurrentRequestUser.securedUser.userId;
        up.relativePath = storedFilePath.toAbsolutePath().toString();
        up.fileName = storedFilePath.getFileName().toString();

        uploadedFileRepository.save(up);

        return up;
    }

    @GetMapping("/download/{fileId}")
    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public ResponseEntity<Resource> download(@PathVariable Integer fileId, HttpServletRequest request) {

        UploadedFile fileDBObject = uploadedFileRepository
                .getByIdAndUserId(fileId, CurrentRequestUser.securedUser.userId);

        Resource resource = fileSystemService.loadFileAsResource(fileDBObject.fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            throw new RuntimeException("Could not determine file type.");
        }
        // Fallback to the default content type if type could not be determined
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    @DeleteMapping("/{fileId}")
    @Transactional
    public void remove(@PathVariable Integer fileId) {

        UploadedFile fileDBObject = uploadedFileRepository
                .getByIdAndUserId(fileId, CurrentRequestUser.securedUser.userId);

        fileSystemService.removeFileAsResource(fileDBObject.fileName);

        uploadedFileRepository.deleteById(fileId);
    }
}
