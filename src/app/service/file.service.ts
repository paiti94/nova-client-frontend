import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl = `${environment.backendApi}/files`;
  constructor(private http: HttpClient) {}

  upload(formData: FormData): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  createFolder(formData: FormData): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.baseUrl}/folder`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
  download(filename: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/download/${filename}`, { responseType: 'blob' });
  }
  
  getFolderStructure(clientId: number, parentId?: number): Observable<any> {
    let params = new HttpParams().set('clientId', clientId.toString());
    if (parentId) {
      params = params.set('parentId', parentId.toString());
    }
    return this.http.get(`${this.baseUrl}/folder-structure`, { params });
  }
}