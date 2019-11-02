import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadedFile } from '../models/file';
import { FileService } from './file.service';

@Component({
	selector: 'dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	uploadedFiles: UploadedFile[] = [];
    fileUploading: boolean = false;

	constructor(
		private fileService: FileService,
		private router: Router) {
	}

	ngOnInit() {
		this.fileService.listAll().subscribe((r) => {
			this.uploadedFiles = r.map(e => new UploadedFile(e));
		});
    }

    downloadFile(fileId: string, filename: string) {
        this.fileService.download(fileId).subscribe(res => {
            var url = window.URL.createObjectURL(res);
            var a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display: none');
            a.href = url;
            res.filename = filename;
            a.download = res.filename;
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove(); // remove the element
        }, error => {
            console.log('download error:', JSON.stringify(error));
        }, () => {
            console.log('Completed file download.');
        });
    }

    public fileEvent($event) {
        this.fileUploading = true;
        const fileSelected: File = $event.target.files[0];
        this.fileService.upload(fileSelected).subscribe((response) => {
            this.fileService.listAll().subscribe((r) => {
                this.uploadedFiles = r.map(e => new UploadedFile(e));
            });
            return response;
        }, (e) => {
            console.log('set any error actions...' + e);
        }, () => {
            this.fileUploading = false;
        });
    }
}
