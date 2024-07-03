import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'nova-client-portal';
  constructor(private keycloakService: KeycloakService) {}

  ngOnInit(): void {
    // if (!this.keycloakService.isLoggedIn()) {
    //    this.keycloakService.login();
    // }
  }
  logout() {
    this.keycloakService.logout('http://localhost:4200/home'); // Redirect to homepage after logout
  }
  
}
