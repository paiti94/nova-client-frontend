import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Job } from '../../model/job.model';
import { AdminServiceService } from '../../service/adminservice.service';
import { MatDialog } from '@angular/material/dialog';
import { AddJobModalComponent } from '../add-job-modal/add-job-modal.component';
import { DatePipe } from '@angular/common';
import { JobDetailModalComponent } from '../job-detail-modal/job-detail-modal.component';
@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent implements OnChanges {
  @Input() clientId: number = 0;
  @Input() key: string = '';
  @Input() clientName: string = '';
  
  openJobs: Job[] = [];
  completedJobs: Job[] = [];

  constructor(private adminService: AdminServiceService, public dialog: MatDialog, public datePipe: DatePipe) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientId']) {
      this.clientId = changes['clientId'].currentValue;
      this.loadJobs();
    }
  }

  loadJobs(): void {
    this.adminService.getJobByClientId(this.clientId.toString()).subscribe(
      (jobs: Job[]) => {
        if (Array.isArray(jobs)) {
          this.openJobs = jobs.filter(job => job.status !== 'Completed');
          this.completedJobs = jobs.filter(job => job.status === 'Completed');
        } else if (jobs && typeof jobs === 'object') {
          this.processSingleJob(jobs);
        }
      },
      (error) => {
       // console.error('Error fetching jobs:', error);
        alert('Error fetching jobs: ' + error.error); // Display error message
      }
    );
  }


  processJobsArray(jobs: Job[]): void {
    this.openJobs = jobs.filter(job => job.status !== 'Completed');
    this.completedJobs = jobs.filter(job => job.status === 'Completed');
  }
  
  processSingleJob(job: Job): void {
    if (job.status === 'Completed') {
      this.completedJobs = [job];
      this.openJobs = [];
    } else {
      this.openJobs = [job];
      this.completedJobs = [];
    }
  }

  openAddJobDialog() {
    const dialogRef = this.dialog.open(AddJobModalComponent, {
      width: '1000px',
      data: { clientId: this.clientId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result if needed
      }
    });
  }


  openJobDetailDialog(job: Job): void {
    const dialogRef = this.dialog.open(JobDetailModalComponent, {
      width: '1000px',
      data: job
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result if needed
      }
    });
  }
}
