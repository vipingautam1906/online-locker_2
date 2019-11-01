import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UploadedFile } from '../models/org/file';

@Injectable()
export class FileService {

	constructor(private httpClient: HttpClient) {
	}

	getAll(): Observable<any> {
		return this.httpClient.get('/secured/files');
	}

	save(uf: UploadedFile): Observable<any> {
		return this.httpClient.post('/secured/file', uf);
	}

	delete(uf: UploadedFile): Observable<any> {
		return this.httpClient.put('/secured/ufs', uf);
	}

	get(ufId: string): Observable<UploadedFile> {
		return this.httpClient.get('/secured/ufs/' + ufId)
			.pipe(map(r => new UploadedFile(r)));
  }

  uploadFile(fileToUpload: File) {
    const _formData = new FormData();
    _formData.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient.post('/secured/files/upload', _formData);

    //note: no HttpHeaders passed as 3d param to POST!
    //So no Content-Type constructed manually.
    //Angular 4.x-6.x does it automatically.
  }
}
