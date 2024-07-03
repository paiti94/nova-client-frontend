import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { User } from '../model/user.model';
import { KeycloakProfile } from 'keycloak-js';

@Injectable({
  providedIn: 'root',
})
export class AuthKeyClockGuard extends KeycloakAuthGuard {
  user = new User();
  public userProfile: KeycloakProfile | null = null;

  constructor(
    protected override readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    }else{
        this.userProfile = await this.keycloak.loadUserProfile();
     
        this.user.authStatus = 'AUTH';
        // console.log(JSON.stringify(this.userProfile));
        this.user.name = this.userProfile.firstName || "";
        this.user.email = this.userProfile.email || "";
        window.sessionStorage.setItem("userdetails",JSON.stringify(this.user));
    }

    // Get the roles required from the route.
    const requiredRoles = route.data["roles"];
    // how to get roles from keycloak and store in session then allow the admin to be able to access all routes, but the user to limited routes

    console.log(JSON.stringify(requiredRoles));

    // Allow the user to to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    // Allow the user to proceed if all the required roles are present.
    return requiredRoles.some((role) => this.roles.includes(role));
  }

  private async checkRoles(requiredRoles: string[], url: string): Promise<boolean> {
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    const isLoggedIn = await this.keycloak.isLoggedIn();
    if (!isLoggedIn) {
      this.keycloak.login({ redirectUri: window.location.origin + url });
      return false;
    }
    const userRoles = this.keycloak.getUserRoles();
    const hasRequiredRoles = requiredRoles.every(role => userRoles.includes(role));

    if (!hasRequiredRoles) {
      this.router.navigate(['access-denied']);
    }

    return hasRequiredRoles;
  }

}