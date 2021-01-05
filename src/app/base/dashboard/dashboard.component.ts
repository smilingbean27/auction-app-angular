import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  showForm = false;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  createAuction(){
    this.router.navigate(['/admin/auction/add'])
  }

}

