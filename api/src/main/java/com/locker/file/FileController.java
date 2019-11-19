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

/**
 * FileController is a file manipulator endpoints container. the endpoints are
 * designed in a way that will help user to upload a MULTIPART file via post request,
 * download a uploaded file by its id, view all the uploaded files list.
 *
 * The controller internally uses two fields - uploadedFileRepository and fileSystemService.
 */
@RestController
@RequestMapping("/secured/files")
public class FileController {

    @Autowired
    private UploadedFileRepository uploadedFileRepository;

    @Autowired
    private FileSystemService fileSystemService;

    /**
     * this method will return all the uploaded_file tables entries for a current
     * user. Internally it calls repository class with currentRequest userId.
     *
     * @return a list of UploadedFile entity records from database.
     */
    @GetMapping
    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public List<UploadedFile> getAllFiles() {
        return uploadedFileRepository.getAll(CurrentRequestUser.securedUser.userId);
    }

    /**
     * An Uploader resource endpoint, which saves file in server's temp
     * folder as it is. it then creates an entry in uploaded_file table
     * with that file absolute path.
     * @param file a MultipartFile sent via post request, which will be
     *            written to directory.
     * @return a saved UploadedFile entity object.
     */
    @PostMapping("/upload")
    @Transactional
    public UploadedFile upload(@RequestParam("file") MultipartFile file) {

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

    /**
     * A Downloader resource endpoint, it first fetches the UploadedFile entity
     * object first based on currently user and fileId. If record doesn't exists
     * then Application exception will be thrown.
     * If record exists, then Spring resource object will be fetched from
     * fileSystem by that file name. and returned to UI with its contentType
     * set in the response.
     *
     * @param fileId the uploaded_file table id to search in db. only if it exists
     *              for current userId then it will be returned.
     * @param request httpServlet request to to pull mimeType for particular
     *               spring file resource.
     *
     * @return Spring Resource object for given fileId.
     */
    @GetMapping("/download/{fileId}")
    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public ResponseEntity<Resource> download(@PathVariable Integer fileId,
                                             HttpServletRequest request) {

        // first loading db object with fileId.
        UploadedFile fileDBObject = uploadedFileRepository.getByIdAndUserId(
                fileId, CurrentRequestUser.securedUser.userId);

        // then preparing its spring resource object from fileSystem
        Resource resource = fileSystemService.loadFileAsResource(
                fileDBObject.fileName);

        // Try to determine file's content type
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(
                    resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            throw new RuntimeException("Could not determine file type.");
        }
        // Fallback to the default content type if type could not be determined
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

    /**
     * This endpoint deletes the file from server's temp directory and
     * then removes from database as well.
     * @param fileId
     */
    @DeleteMapping("/{fileId}")
    @Transactional
    public void remove(@PathVariable Integer fileId) {

        UploadedFile fileDBObject = uploadedFileRepository.getByIdAndUserId(
                fileId, CurrentRequestUser.securedUser.userId);

        fileSystemService.removeFileAsResource(fileDBObject.fileName);

        uploadedFileRepository.deleteById(fileId);
    }
}
