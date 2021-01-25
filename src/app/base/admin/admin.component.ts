import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { User } from '../user';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, switchMap, distinct, distinctUntilChanged } from 'rxjs/operators';
import { AdminDataService } from '../../_services/admin-data.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private adminService: AdminDataService,
              private route: ActivatedRoute) { }

  adminRoute = false;
  searchedUser$: Observable<User> = of({} as User);
  verified: boolean = false;

  @Output() userVerifyEvent = new EventEmitter<boolean>();

  private searchedForm = new Subject<User>();

  loginForm = new FormGroup({
    email: new FormControl('',
      [ Validators.required,]
    ),
    password: new FormControl('', 
      [ Validators.required,]
    )
  }
  )

  get email(){
    return this.loginForm.get('email') as FormControl;
  }

  get password(){
    return this.loginForm.get('password') as FormControl;
  }

  ngOnInit(): void {

    this.loginForm.valueChanges.subscribe(({email, password}) => {
      if (email && password){
        this.searchedForm.next({email, password} as User);
        } 
    })

    this.searchedUser$ = this.searchedForm.pipe(
      debounceTime(3000),
      distinctUntilChanged(),
      switchMap(user => {
        return of(user);
      })
    )

    this.searchedUser$.subscribe(user => {
      this.adminService.verifyUser(user, this.adminRoute);
    });

    const path = this.route.snapshot.routeConfig?.path;
    if (path === 'admin/sign-in') this.adminRoute = true;
    else this.adminRoute = false;

    const user = this.adminService.getUserFromStorage();
    if (user && user.isAdmin) this.router.navigate(['admin/dashboard']);
    else if(user && !user.isAdmin) this.router.navigate(['dashboard']);

  }

  
}

