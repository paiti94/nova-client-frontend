import { Component } from '@angular/core';
import { User } from '../../model/user.model';
import { KeycloakProfile } from 'keycloak-js';
import { KeycloakService } from 'keycloak-angular';
import { AdminServiceService } from '../../service/adminservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  user = new User();

  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  public isAdmin: boolean = false;

  constructor(private readonly keycloak: KeycloakService, private adminService : AdminServiceService) { }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      this.isAdmin = await this.keycloak.isUserInRole('ADMIN');
      this.user.authStatus = 'AUTH';
      this.user.name = this.userProfile.firstName || "";
      window.sessionStorage.setItem("userdetails",JSON.stringify(this.user));
      
    }
  }

  public login() {
    this.keycloak.login();
    this.adminService.mapUser().subscribe((data: any) => {
      console.log(data);
    })
  }

  public logout() {
    let redirectURI: string = "http://localhost:4200/home";
    this.keycloak.logout(redirectURI);
  }
}
