import { Job } from "./job.model";

export class Task {
    public id: number;
    public name: string;
    public description: string;
    public type: string;  // Type can be "admin task", "client task", "group task"
    public priority: string;
    public due_Date: Date;
    public status: string;
    public clientId: number;
    public jobId  : number;
    public notes: string;
  
    constructor(
      id?: number, name?: string, description?: string, type?: string, priority?: string, due_Date?: Date,
      status?: string, clientId?: number, jobId?: number, notes?: string
    ) {
      this.id = id || 0;
      this.name = name || '';
      this.description = description || '';
      this.type = type || '';
      this.priority = priority || '';
      this.due_Date = due_Date || new Date();
      this.status = status || '';
      this.clientId = clientId || 0;
      this.jobId = jobId || 0;
      this.notes = notes || '';
    }
  }
  