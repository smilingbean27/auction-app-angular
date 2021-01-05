import { Component, OnInit } from '@angular/core';
import { AdminDataService } from 'src/app/_services/admin-data.service';
import { Observable, of, Subject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  authenticated = false;

  constructor(public adminService: AdminDataService, private route: Router) {
    this.authenticated = this.adminService.isAuthenticated();
    console.log(this.authenticated)
  }

  ngOnInit(): void {
   this.adminService.authenticated$.subscribe(
     auth => this.authenticated = auth
   )
  }

  signOut(){
    this.adminService.setAuthentication(false);
    this.route.navigate(['/admin/sign-in'])
  }

}
