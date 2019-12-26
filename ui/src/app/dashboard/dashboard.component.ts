import { Component, OnInit } from '@angular/core';
import { UploadedFile } from '../models/common';
import { FileService } from './file.service';
import {ToastService} from "../toast.service";

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
        private toastService: ToastService) { }
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
            a.remove();
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

            this.toastService.success('Uploading', 'File has been uploaded successfully');

            this.fileService.listAll().subscribe((r) => {
                this.uploadedFiles = r.map(e => new UploadedFile(e));
            });
            return response;
        }, e => console.log(e), () => {
            this.fileUploading = false;
        });
    }

    removeFile(fileId: string) {

        this.fileService.remove(fileId).subscribe(res => {
            this.toastService.success('Deleting', 'File has been deleted successfully');

            this.fileService.listAll().subscribe((r) => {
                this.uploadedFiles = r.map(e => new UploadedFile(e));
            });
        });
    }
}
