import { Component } from '@angular/core';
import { AdminServiceService } from '../../service/adminservice.service';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  files: File[] = [];
  isFileOver: boolean = false;

  constructor(private adminService: AdminServiceService) {}

  onFileDropped(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.files.push(file);
        });
      }
    }
  }

  onFileSelected(event: any) {
    const selectedFiles = event.target.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      this.files.push(selectedFiles[i]);
    }
  }

  uploadFiles() {
    const formData = new FormData();
    this.files.forEach(file => {
      formData.append('files', file, file.name);
    });

    this.adminService.uploadFiles(formData).subscribe(
      response => {
        console.log('Files uploaded successfully:', response);
      },
      error => {
        console.error('Error uploading files:', error);
      }
    );
  }

  fileOver(event: any) {
    this.isFileOver = true;
  }

  fileLeave(event: any) {
    this.isFileOver = false;
  }
}
