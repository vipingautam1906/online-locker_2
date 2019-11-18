import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FileService {

    constructor(private httpClient: HttpClient) {
    }

    listAll(): Observable<any> {
        return this.httpClient.get('/secured/files');
    }

    upload(fileToUpload: File) {
        const formData = new FormData();
        formData.append('file', fileToUpload, fileToUpload.name);
        return this.httpClient.post('/secured/files/upload', formData);
    }

    download(fileId: string): Observable<any> {
        return this.httpClient.get(`/secured/files/download/${fileId}`, {
            responseType: 'blob'
        });
    }
    remove(fileId: string): Observable<any> {
        return this.httpClient.delete(`/secured/files/${fileId}`);
    }
}
