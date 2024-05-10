import { Component } from '@angular/core';
import { User } from '../../model/user.model';
import '@fortawesome/fontawesome-free/css/all.min.css';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  user = new User();

  constructor() {
    
  }

  ngOnInit() {
    if(sessionStorage.getItem('userdetails')){
      this.user = JSON.parse(sessionStorage.getItem('userdetails') || "");
    }
  }
}
