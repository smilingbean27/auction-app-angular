import { Component, OnInit } from '@angular/core';
import { AdminDataService } from 'src/app/_services/admin-data.service';
import { Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  isSignUpRoute = false;
  isAuthenticated = false;

  constructor(public adminService: AdminDataService, private router: Router) {
    
  }

  ngOnInit(): void {
    this.adminService.userData$.subscribe(
      _ => {
        this.isAuthenticated = this.adminService.checkAuthentication();

        const user = this.adminService.getUserFromStorage();
        if (user && user.isAdmin) this.router.navigate(['admin/dashboard']);
        else if (user && !user.isAdmin) this.router.navigate(['dashboard']);
      }
    );

    this.isAuthenticated = this.adminService.checkAuthentication();
    
  }

  signOut(){
    const user = this.adminService.getUserFromStorage();
    this.adminService.setUserInStorage('');

    if (user && user.isAdmin) this.router.navigate(['/admin/sign-in']);
    else if (user && !user.isAdmin) this.router.navigate(['/sign-in']);
    
  }

}
