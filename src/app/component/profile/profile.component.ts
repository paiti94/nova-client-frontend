import { Component } from '@angular/core';
import { User } from '../../model/user.model';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user = new User();
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('userdetails')!);
    if(this.user){
      this.dashboardService.getUserDetails(this.user.email).subscribe(
        responseData => {
        this.user = <any> responseData.body;
        });
    }

  }
}
