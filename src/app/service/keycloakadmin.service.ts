import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import Keycloak from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';
@Injectable({
  providedIn: 'root'
})
export class KeycloakadminService {

  private keycloakUrl = `${environment.keycloakBaseUrl}/auth/admin/realms/${environment.realm}`;
  private keycloakAdminUrl = `${environment.keycloakBaseUrl}/admin/realms/${environment.realm}`;

  constructor(private http: HttpClient, private keycloakService: KeycloakService) {
    
  } 

  public getAdminToken(){
    return new Promise((resolve, reject) => {
      this.keycloakService.getToken().then((tokenResponse: any) => {
        const serviceAccountToken = tokenResponse.access_token;
        resolve(serviceAccountToken);
      }).catch((error) => {
        console.error('Failed to retrieve service account token:', error);
        reject(error);
      });
    });
  }

  addRoleToUser(userId: string, roleId: string, roleName: string): Observable<any> {
    return from(this.keycloakService.getToken()).pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        const payload = [
          {
            id: roleId,
            name: roleName
          }
        ];
        const encodedUserId = encodeURIComponent(userId);
        return this.http.post(`${this.keycloakAdminUrl}/users/${encodedUserId}/role-mappings/realm`, payload, { headers });
      })
    );
  }

getUsers(): Observable<any> {
  return from(this.keycloakService.getToken()).pipe(
    switchMap(token => {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get(`${this.keycloakAdminUrl}/users`, { headers });
    })
  );
}

getRoles(): Observable<any> {
  return from(this.keycloakService.getToken()).pipe(
    switchMap(token => {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get(`${this.keycloakAdminUrl}/roles`, { headers });
    })
  );
}


}
