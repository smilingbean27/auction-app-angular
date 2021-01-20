import { Component, OnInit } from '@angular/core';
import { AdminDataService } from 'src/app/_services/admin-data.service';
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  users = {
    user: {
      authenticated: false
    },
    admin:{
      authenticated: false
    }
  }

  constructor(public adminService: AdminDataService, private router: Router) {
    
  }

  ngOnInit(): void {
   this.adminService.adminIsAuthenticated$.subscribe(
     auth => {
       if(auth){
        this.router.navigate(['admin/dashboard'])
        .then((success: boolean) => {
          if (success) this.users.admin.authenticated = auth;
        })
       } 
    }
   )
   this.adminService.userIsAuthenticated$.subscribe(
    auth => {
      if(auth) {
        this.router.navigate(['dashboard'])
        .then((success: boolean) => {
          if (success) this.users.user.authenticated = auth;
        })
        
      }

    }
  )
  }

  signOut(){
    if (this.users.admin.authenticated){
      this.adminService.setAuthentication(false, 'admin');
      this.router.navigate(['/admin/sign-in']);
      this.users.admin.authenticated = false;
    }
    if (this.users.user.authenticated){
      this.adminService.setAuthentication(false, 'user');
      this.router.navigate(['/sign-in']);
      this.users.user.authenticated = false;
    }
    
  }

}
