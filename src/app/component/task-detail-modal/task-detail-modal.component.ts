import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../model/task.model';
import { AdminServiceService } from '../../service/adminservice.service';

@Component({
  selector: 'app-task-detail-modal',
  templateUrl: './task-detail-modal.component.html',
  styleUrl: './task-detail-modal.component.scss'
})
export class TaskDetailModalComponent {
  task: Task = new Task();

  constructor( public dialogRef: MatDialogRef<TaskDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task: Task, clientId: number },
    private adminService: AdminServiceService) { }


    ngOnInit(): void {
      this.task = {...this.data.task};
    }

    onCancel(): void {
      this.dialogRef.close(false);
    }

    saveTask(): void {
      const updatedTask = { ...this.task };
      this.adminService.updateTask(updatedTask.id, updatedTask).subscribe(
        response => {
          alert('Task updated successfully');
          console.log('Task saved successfully:', response);
          this.dialogRef.close(true);
          location.reload();
        },
        error => {
          alert('Error updating task, please try again');
          console.error('Error saving task:', error);
        }
      );
      this.dialogRef.close(this.task);
    }
}
