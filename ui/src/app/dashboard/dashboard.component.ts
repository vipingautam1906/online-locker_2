import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UploadedFile } from '../models/org/file';
import { FileService } from './file.service';

@Component({
	selector: 'dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	uploadedFiles: UploadedFile[] = [];

	constructor(
		private fileService: FileService,
		private router: Router) {
	}

	ngOnInit() {
		this.fileService.getAll().subscribe((r) => {
			this.uploadedFiles = r.map(e => new UploadedFile(e));
		});
  }

  downloadFile(id: string) {
  }

  public fileEvent($event) {
    const fileSelected: File = $event.target.files[0];
    this.fileService.uploadFile(fileSelected)
    .subscribe( (response) => {
       console.log('set any success actions...');

       this.fileService.getAll().subscribe((r) => {
        this.uploadedFiles = r.map(e => new UploadedFile(e));
      });

       return response;
     },
      (error) => {
        console.log('set any error actions...');
      });
 }
}
