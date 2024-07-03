import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminServiceService } from '../../service/adminservice.service';
import { Task } from '../../model/task.model';
import { Client } from '../../model/client.model';

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

  
  constructor(
    private route: ActivatedRoute,
    private adminService: AdminServiceService
  ) { }

  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientId']) {
      this.clientId = changes['clientId'].currentValue;
      this.fetchClientTasks();
      this.fetchClientDetails();
    }
  }

  fetchClientTasks() {
    this.adminService.getTasksByClientId(this.clientId.toString()).subscribe(tasks => {
      tasks.forEach(task => {
        if(task.type === 'client task') {
          if(task.status === 'Completed') {
            this.completedTasks.push(task);
          }else{
            this.openTasks.push(task);
          }
        }
      })
    });
  }

  fetchClientDetails() {
    // Fetch client details based on clientId
  }

  editTask(task: Task) {
    // Implement task editing logic
  }

  addComment(task: Task) {
    // Implement comment adding logic
  }

  createNewTask() {
    // Implement new task creation logic
  }
}
