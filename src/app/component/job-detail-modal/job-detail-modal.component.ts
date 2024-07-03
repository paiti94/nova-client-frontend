  import { Component, Inject } from '@angular/core';
  import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
  import { Job } from '../../model/job.model';
  import { DatePipe } from '@angular/common';
  import { AdminServiceService } from '../../service/adminservice.service';
  import { Tag } from '../../model/tag.model';
  import { Task } from '../../model/task.model';
  import { TaskModalComponent } from '../task-modal/task-modal.component';

  @Component({
    selector: 'app-job-detail-modal',
    templateUrl: './job-detail-modal.component.html',
    styleUrl: './job-detail-modal.component.scss',
    providers: [DatePipe]
  })
  export class JobDetailModalComponent {
    job: Job;
    jobTags: Tag[] = [];
    allTags: Tag[] = [];
    tasks: Task[] = [];
    newComment: string = '';
    newTagName: string = '';
    constructor(
      public dialogRef: MatDialogRef<JobDetailModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: Job,
      private datePipe: DatePipe, public adminService: AdminServiceService, public dialog: MatDialog
    ) {
      this.job = {...data};
    }

    ngOnInit(): void {
      this.fetchTags();
      this.loadTasks();
      this.job.tags.split(',').map(tag => {
        this.jobTags.push({ id: 0,name: tag });
      })
    }

    loadTasks(): void {
      this.adminService.getTasksByJobId(this.job.id).subscribe(
        tasks => {
          this.tasks = tasks;
          console.log("this is the tasks, " + JSON.stringify(this.tasks));
        },
        error => {
          console.error('Error fetching tasks:', error);
        }
      );
    }


    removeTask(task: Task): void {
      const confirmDeletion = window.confirm("Are you sure you want to delete this task?");
      if (confirmDeletion) {
        const index = this.tasks.indexOf(task);
        if (index >= 0) {
          this.tasks.splice(index, 1);
          console.log("this is the tasks after removing, " + JSON.stringify(this.tasks)); 
        }
      }
    }

    close(): void {
      this.dialogRef.close();
    }

    addTask(): void {
      const dialogRef = this.dialog.open(TaskModalComponent, {
        width: '500px',
        data: { job: this.job , clientId: this.job.client.id}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadTasks();
        }
      });
    }

    addComment(): void {
      if (this.newComment.trim()) {
        this.job.comments.push(this.newComment.trim());
        this.newComment = '';
      }
    }
    getFormattedDate(date: Date): string | null {
      return this.datePipe.transform(date, 'yyyy-MM-dd');
    }

    updateJob(): void {
      const updatedJob = {
        ...this.job,
        tags: this.jobTags.map(tag => tag.name).join(','),
        tasks: this.tasks,
      };

      console.log(updatedJob);
      this.adminService.updateJob(this.job.id, updatedJob).subscribe(
        response => {
          alert('Job updated successfully');
          this.dialogRef.close(updatedJob);
          window.location.reload();
        },
        error => {
          alert('Error updating job');
          console.error('Error updating job:', error);
        }
      );
    }

    deleteJob(): void {
      this.adminService.deleteJob(this.job.id).subscribe(
        response => {
          alert('Job deleted successfully');
          this.dialogRef.close(null);
         window.location.reload();
        },
        error => {
          alert('Error deleting job');
          console.error('Error deleting job:', error);
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

    
  }
