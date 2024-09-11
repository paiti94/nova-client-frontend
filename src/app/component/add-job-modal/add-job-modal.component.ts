import { Component, Inject } from '@angular/core';
import { Job } from '../../model/job.model';
import { AdminServiceService } from '../../service/adminservice.service';
import { User } from '../../model/user.model';
import { UserBackend } from '../../model/user-backend.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith, switchMap } from 'rxjs';
import { Tag } from '../../model/tag.model';
import { Client } from '../../model/client.model';

@Component({
  selector: 'app-add-job-modal',
  templateUrl: './add-job-modal.component.html',
  styleUrl: './add-job-modal.component.scss'
})
export class AddJobModalComponent {
  job: Job = new Job();
  jobTags: Tag[] = [];
  allTags: Tag[] = [];
  client: Client = new Client();
  adminUsers: UserBackend[] = [];
  selectedAssignedTo: UserBackend = new UserBackend();
  selectedAssignedBy: UserBackend = new UserBackend();
  newTagName: string = '';
  newComment: string = '';
  constructor(private adminService: AdminServiceService, @Inject(MAT_DIALOG_DATA) public data: { clientId: number }, public dialogRef: MatDialogRef<AddJobModalComponent>, public datePipe: DatePipe) {
    this.job.start_Date = new Date();
  }

  ngOnInit(): void {
    this.fetchAdminUsers();
    this.fetchTags();
  }

  fetchAdminUsers(): void {
    this.adminService.getAdminUsers().subscribe(
      (users: UserBackend[]) => {
        this.adminUsers = users;
        console.log('Admin users:', JSON.stringify(this.adminUsers));
      },
      error => {
        console.error('Error fetching admin users:', error);
      }
    );
  }

  addComment(): void {
    if (this.newComment.trim()) {
      this.job.comments.push(this.newComment.trim());
      this.newComment = '';
    }
  }
  addJob() {
    this.addComment();
    this.getClientInfo(this.data.clientId).pipe(
      switchMap(client => {
        const newJob = {
          ...this.job,
          client,
          assignedTo: this.selectedAssignedTo,
          assignedBy: this.selectedAssignedBy,
          tags: this.jobTags.map(tag => tag.name).join(', '),
          comments: [...this.job.comments] || [],
          files: [...this.job.files] || []
        };
        return this.adminService.addJob(newJob);
      })
    ).subscribe(
      response => {
        console.log('Job added successfully:', response);
        alert('Job added successfully');
        this.job = new Job();
        this.selectedAssignedTo = new UserBackend();
        this.selectedAssignedBy = new UserBackend();
        this.jobTags = [];
      },
      error => {
        console.error('Error adding job:', error);
        alert('Error adding job. Please try again.');
      }
    );
  }

  getClientInfo(id: number): Observable<Client> {
    return this.adminService.getClient(id);
  }
  onSubmit() {
    this.addJob();
    this.dialogRef.close();
  // window.location.reload();
  }

  onCancel() {
    this.dialogRef.close();
  }

  fetchTags(): void {
    this.adminService.getTags().subscribe(
      (tags: Tag[]) => {
        this.allTags = tags;
      },
      error => {
        console.error('Error fetching tags:', error);
      }
    );
  }
 addTag(): void {
    if (this.newTagName.trim()) {
      const existingTag = this.allTags.find(tag => tag.name === this.newTagName.trim());
      if (existingTag) {
        if (!this.jobTags.find(tag => tag.name === this.newTagName.trim())) {
          this.jobTags.push(existingTag);
        }
      } else {
        const newTag: Tag = { id: 0, name: this.newTagName.trim() };
        this.adminService.addTag(newTag).subscribe(
          (tag: Tag) => {
            this.allTags.push(tag);
            this.jobTags.push(tag);
          },
          error => {
            console.error('Error adding tag:', error);
          }
        );
      }
    }
    this.newTagName = '';
  }

  removeTag(tag: Tag): void {
    const index = this.jobTags.indexOf(tag);
    if (index >= 0) {
      this.jobTags.splice(index, 1);
    }
  }

}
