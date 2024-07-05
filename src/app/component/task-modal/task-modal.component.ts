import { Component, Inject } from '@angular/core';
import { Task } from '../../model/task.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminServiceService } from '../../service/adminservice.service';
import { UserBackend } from '../../model/user-backend.model';
import { Job } from '../../model/job.model';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss'
})
export class TaskModalComponent {
  task: Task = new Task();
  users: UserBackend[] = [];
  newComment: string = '';
  constructor(
    public dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { job: Job, clientId: number },
    private adminService: AdminServiceService
  ) {}

  ngOnInit(): void {
    this.task.jobId = this.data.job.id;
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.adminService.getAdminUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  addTask(): void {
    const newTask = { ...this.task, jobId: this.data.job.id, clientId: this.data.clientId ,
    };
    this.adminService.addTask(newTask).subscribe(
      response => {
        console.log('Task added successfully:', response);
        this.dialogRef.close(true);
      },
      error => {
        console.error('Error adding task:', error);
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }


}
