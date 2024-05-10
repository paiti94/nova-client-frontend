import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './component/homepage/homepage.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProfileComponent } from './component/profile/profile.component';
import { MessageComponent } from './component/message/message.component';
import { AuthKeyClockGuard } from './routeguards/auth.route';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component:HomepageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthKeyClockGuard],data: {
    
  }},
  { path: 'users', component:ProfileComponent, canActivate: [AuthKeyClockGuard],data: {
    roles: ['USER']
  }},
  { path: 'message', component:MessageComponent }
  // You can add more routes here if needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
