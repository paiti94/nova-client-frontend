import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { DashboardService } from '../../service/dashboard.service';
import { AdminServiceService } from '../../service/adminservice.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'] // Corrected styleUrl to styleUrls
})
export class ProfileComponent implements OnInit {
  user: User | null = null; // Initialize as null to handle loading state

  constructor(private dashboardService: DashboardService, private adminService: AdminServiceService) { }

  ngOnInit(): void {
    const userDetails = sessionStorage.getItem('userdetails');
    console.log('userdetails from sessionStorage:', userDetails);

    if (userDetails) {
      try {
        this.user = JSON.parse(userDetails);
        console.log('Parsed user:', this.user);

        // if (this.user && this.user.email) {
        //   this.adminService.getUser(this.user.email).subscribe(
        //     responseData => {
        //       console.log('Full API response:', responseData);

        //       // Assuming the response structure
        //       if (responseData && responseData.body) {
        //         this.user = responseData.body as User;
        //         console.log('Updated user:', this.user);
        //       } else {
        //         console.error('Response does not contain body or body is null');
        //       }
        //     },
        //     error => {
        //       console.error('Error fetching user details:', error);
        //       // Handle error appropriately, e.g., show an error message
        //     }
        //   );
        // }
      } catch (error) {
        console.error('Error parsing userdetails from sessionStorage:', error);
        // Handle parsing error, e.g., clear invalid session data
        sessionStorage.removeItem('userdetails');
      }
    } else {
      console.error('No user details found in sessionStorage');
    }
  }
}
