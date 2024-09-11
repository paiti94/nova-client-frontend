import { Component, Input } from '@angular/core';
import { AdminServiceService } from '../../service/adminservice.service';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { FileService } from '../../service/file.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  @Input()
  clientId: number | null = null;
  @Input()
  jobId?: number | null = null;
  @Input()
  clientName?: string | null = null;
  isFileOver: boolean = false;
  selectedFiles: File[] = [];
  files: NgxFileDropEntry[] = [];
  displayFiles: { name: string, size: number }[] = [];
  fileType: string = 'fileByClient';
  guiLocation: string = '';
  folderStructure: any[] = [];
  folderName: string = '';

  constructor(private adminService: AdminServiceService, private fileService: FileService) {}

  ngOnInit() {
    if (this.clientId) {
      this.loadFolderStructure(this.clientId);
    }
  }

  loadFolderStructure(clientId: number, parentId?: number) {
    this.fileService.getFolderStructure(clientId, parentId).subscribe(
      (data: any[]) => {
        this.folderStructure = data;
      },
      error => {
        console.error('Error fetching folder structure:', error);
      }
    );
  }

  getFolderName(){
    this.folderName = "getFolderName";
  }
  
  public onFileDropped(files: NgxFileDropEntry[]) {
    this.files = files;
    this.displayFiles = [];
    for (const droppedFile of this.files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.displayFiles.push({ name: file.name, size: file.size });
        });
      }
    }
  }

  private resetFileLists() {
    this.displayFiles = [];
    this.files = [];
    this.selectedFiles = [];
  }

  onFileSelected(event: any) {
    const selectedFiles: File[] = event.target.files;
    this.selectedFiles = [];
    this.displayFiles = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      this.selectedFiles.push(selectedFiles[i]);
      this.displayFiles.push({ name: selectedFiles[i].name, size: selectedFiles[i].size });
    }
  }

  uploadFiles(guiLocation: string) {
    for (const droppedFile of this.files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.uploadFile(file, guiLocation);
        });
      }
    }
    for (const file of this.selectedFiles) {
      this.uploadFile(file, guiLocation);
    }
    this.files = [];
    this.selectedFiles = [];
  }

  fileOver(event: any) {
    this.isFileOver = true;
    console.log('File over event:', event);
  }

  fileLeave(event: any) {
    this.isFileOver = false;
    console.log('File leave event:', event);
  }

  onDownload(filename: string) {
    this.fileService.download(filename).subscribe(response => {
      let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  private uploadFile(file: File, guiLocation: string) {
    const formData: FormData = new FormData();
    formData.append('file', file);
    if (this.jobId) {
      formData.append('jobId', this.jobId.toString());
    }
    if (this.clientId) {
      formData.append('clientId', this.clientId.toString());
    }
    formData.append('fileType', this.fileType);
    formData.append('guiLocation', guiLocation);

    this.fileService.upload(formData).subscribe(
      event => {
        if (event.type === HttpEventType.Response) {
          console.log('Upload response:', event.body);
          alert('File uploaded successfully');
          this.resetFileLists();
          this.loadFolderStructure(this.clientId!); // Reload folder structure
         // window.location.reload();
        }
      },
      error => {
        console.error('Upload error:', error);
        alert('File upload failed');
        this.resetFileLists();
       // window.location.reload();
      }
    );
  }

  triggerFileInput() {
    const fileInput = document.getElementById('file-input') as HTMLElement;
    fileInput.click();
  }

  createFolder(guiLocation: string) {
    const formData: FormData = new FormData();
    formData.append('folderName', guiLocation); // Assuming the folder name is passed as guiLocation
    if (this.jobId) {
      formData.append('jobId', this.jobId.toString());
    }
    if (this.clientId) {
      formData.append('clientId', this.clientId.toString());
    }
    formData.append('guiLocation', guiLocation);

    this.fileService.createFolder(formData).subscribe(
      event => {
        if (event.type === HttpEventType.Response) {
          console.log('Folder creation response:', event.body);
          alert('Folder created successfully');
          this.loadFolderStructure(this.clientId!); // Reload folder structure
          location.reload();
        }
      },
      error => {
        console.error('Folder creation error:', error);
        alert('Folder creation failed');
      }
    );
  }
}
