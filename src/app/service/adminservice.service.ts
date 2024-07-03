import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Job } from '../model/job.model';
import { Task } from '../model/task.model';
import { User } from '../model/user.model';
import { UserBackend } from '../model/user-backend.model';
import { Tag } from '../model/tag.model';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  private apiClientUrl = `${environment.backendApi}/clients`;
  private apiUserUrl = `${environment.backendApi}/users`;
  private apiTaskUrl = `${environment.backendApi}/tasks`;
  private apiJobUrl = `${environment.backendApi}/jobs`;
  private apiTagUrl = `${environment.backendApi}/tag`;
  
  constructor(private http: HttpClient, private keycloakService: KeycloakService) { }

  private getAuthHeaders(): Observable<HttpHeaders> {
    return from(this.keycloakService.getToken()).pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        });
        return [headers];
      })
    );
  }

  addClient(client: any): Observable<any> {
    return this.getAuthHeaders().pipe(
      switchMap(headers => {
        return this.http.post(`${this.apiClientUrl}/create`, JSON.stringify(client), { headers });
      })
    );
  }

  getClients(): Observable<any> {
    return this.getAuthHeaders().pipe(
      switchMap(headers => {
        return this.http.get(`${environment.backendApi}/clients/listall`, { headers });
      })
    );
  }

  getClient(id: number): Observable<any> {
    return this.getAuthHeaders().pipe(
      switchMap(headers => {
        return this.http.get(`${this.apiClientUrl}/find/${id}`, { headers });
      })
    );
  }

  updateClient(id: number, client: any): Observable<any> {
    return this.getAuthHeaders().pipe(
      switchMap(headers => {
        return this.http.put(`${this.apiClientUrl}/update/${id}`, JSON.stringify(client), { headers });
      })
    );
  }

  deleteClient(id: number): Observable<any> {
    return this.getAuthHeaders().pipe(
      switchMap(headers => {
        return this.http.delete(`${this.apiClientUrl}/delete/${id}`, { headers });
      })
    );
  }

  getUser(email: string): Observable<any> {
    return this.getAuthHeaders().pipe(
      switchMap(headers => {
        return this.http.get(`${this.apiUserUrl}/findbyemail/${email}`, { headers });
      })
    );
  }

  mapUser(){
    return this.getAuthHeaders().pipe(
      switchMap(headers => {
        return this.http.get(`${this.apiUserUrl}/map`, { headers });
      })
    );
  }

  getAdminUsers(): Observable<UserBackend[]> {
    return this.http.get<UserBackend[]>(`${this.apiUserUrl}/admins`);
  }

  getWorkspace(client_id:string): Observable<any>{
    return this.getAuthHeaders().pipe(
      switchMap(headers => {
        return this.http.get(`${this.apiUserUrl}/getworkspace/${client_id}`, { headers });
      })
    );
  }
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiTaskUrl}`);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiTaskUrl}/${id}`);
  }

  getTasksByJobId(jobId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiTaskUrl}/job/${jobId}`);
  }

  getTasksByClientId(clientId: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiTaskUrl}/client/${clientId}`);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiTaskUrl, task);
  }

  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiTaskUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiTaskUrl}/${id}`);
  }

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiJobUrl}`);
  }

  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.apiJobUrl}/${id}`);
  }

  getJobByClientId(clientId: string): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.apiJobUrl}/client/${clientId}`);
  }

  addJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.apiJobUrl, job);
  }

  updateJob(id: number, job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.apiJobUrl}/${id}`, job);
  }

  deleteJob(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiJobUrl}/${id}`);
  }
  
  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.apiTagUrl}`);
  }

  getTagById(id: number): Observable<Tag> {
    return this.http.get<Tag>(`${this.apiTagUrl}/${id}`);
  }

  addTag(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(this.apiTagUrl, tag);
  }

  deleteTag(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiTagUrl}/${id}`);
  }
}
