import { Component, OnInit } from '@angular/core';
import { AdminDataService } from 'src/app/_services/admin-data.service';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/_services/user-data.service';


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

  constructor(public adminService: AdminDataService, private route: Router) {
    
  }

  ngOnInit(): void {
   this.adminService.adminIsAuthenticated$.subscribe(
     auth => this.users.admin.authenticated = auth
   )
   this.adminService.userIsAuthenticated$.subscribe(
    auth => this.users.user.authenticated = auth
  )
  }

  signOut(){
    if (this.users.admin.authenticated){
      this.adminService.setAuthentication(false, 'admin');
      this.route.navigate(['/admin/sign-in'])
    }
    if (this.users.user.authenticated){
      this.adminService.setAuthentication(false, 'user');
      this.route.navigate(['/sign-in'])
    }
    
  }

}
