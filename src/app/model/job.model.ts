import { Client } from "./client.model";
import { Task } from "./task.model";
import { UserBackend } from "./user-backend.model";

export class Job {
    public id: number;
    public name: string;
    public description: string;
    public urgency: string;
    public repeat: string;
    public start_Date: Date;
    public due_Date: Date; 
    public status: string;
    public tags: string;
    public assignedTo: UserBackend;
    public assignedBy: UserBackend;
    public client: Client;
    public comments: string[];
    public files: string[];
    public tasks: Task[];

    constructor(id?: number,name?: string, description?: string, urgency?: string, repeat?: string, start_Date?: Date, due_Date?: Date, status?: string, tags?: string,
        assignedTo?: UserBackend, assignedBy?: UserBackend, client?: Client, comments?: string[], files?: string[], tasks?: Task[]) {
          this.id = id || 0;
          this.name = name || '';
          this.description = description || '';
          this.urgency = urgency || '';
          this.repeat = repeat || '';
          this.start_Date = start_Date || new Date();
          this.due_Date = due_Date || new Date();
          this.status = status || '';
          this.tags = tags || '';
          this.assignedTo = assignedTo || new UserBackend();
          this.assignedBy = assignedBy || new UserBackend();
          this.client = client || new Client();
          this.comments = comments || [];
          this.files = files || [];
          this.tasks = tasks || [];
    }
  }