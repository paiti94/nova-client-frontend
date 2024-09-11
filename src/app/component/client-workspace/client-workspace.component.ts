import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminServiceService } from '../../service/adminservice.service';
import { Task } from '../../model/task.model';
import { Client } from '../../model/client.model';
import { Observable } from 'rxjs';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { TaskDetailModalComponent } from '../task-detail-modal/task-detail-modal.component';

@Component({
  selector: 'app-client-workspace',
  templateUrl: './client-workspace.component.html',
  styleUrl: './client-workspace.component.scss'
})
export class ClientWorkspaceComponent {
  @Input() clientId: number = 0;
  @Input() key: string = '';
  @Input() client: Client = new Client(); ;
  openTasks: Task[] = [];
  completedTasks: Task[] = [];
  completedTasks$: Observable<any> = new Observable();
  
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminServiceService,
    public dialog: MatDialog,
  ) { }

  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientId']) {
      this.clientId = changes['clientId'].currentValue;
      this.fetchClientTasks();
      this.fetchClientDetails();
    }
  }

  fetchClientTasks() {
    this.completedTasks$ = this.adminService.getTasksByClientId(this.clientId.toString());
  }

  fetchClientDetails() {
    // Fetch client details based on clientId
  }

  editTask(task: Task) {
    // Implement task editing logic
    this.openEditTaskDialog(task);
  }

  addComment(task: Task) {
    // Implement comment adding logic
  }

  createNewTask() {
    this.openAddTaskDialog();
  }

  openEditTaskDialog(task: Task) {
    const dialogRef = this.dialog.open(TaskDetailModalComponent, {
      width: '1000px',
      data: { task: task, clientId: this.clientId }
    });
  }
  openAddTaskDialog() {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '1000px',
      data: { clientId: this.clientId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the result if needed
      }
    });
  }

}
