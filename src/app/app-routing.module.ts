import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './component/homepage/homepage.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProfileComponent } from './component/profile/profile.component';
import { MessageComponent } from './component/message/message.component';
import { AuthKeyClockGuard } from './routeguards/auth.route';
import { UsersComponent } from './component/users/users.component';
import { ClientsComponent } from './component/clients/clients.component';
import { WorkspaceComponent } from './component/workspace/workspace.component';

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthKeyClockGuard], data: {} },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthKeyClockGuard], data: { roles: ['USER'] } },
  { path: 'message', component: MessageComponent },
  { path: 'users', component: UsersComponent, canActivate: [AuthKeyClockGuard], data: { roles: ['ADMIN'] } },
  { path: 'clients', component: ClientsComponent, canActivate: [AuthKeyClockGuard], data: { roles: ['ADMIN'] } },
  { path: 'workspace/:clientid', component: WorkspaceComponent , canActivate: [AuthKeyClockGuard], data: { roles: ['ADMIN'] }},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }