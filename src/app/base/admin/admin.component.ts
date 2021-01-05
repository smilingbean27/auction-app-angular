import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { User } from '../user';
import { Router } from '@angular/router';
import { Subject, Observable, of } from 'rxjs';
import { debounceTime, switchMap, distinct, distinctUntilChanged } from 'rxjs/operators';
import { AdminDataService } from '../../_services/admin-data.service';
import { CustomPasswordValidator } from '../../_validators/customPasswordValidator.directive';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private route: Router, private adminService: AdminDataService) { 
    this.adminService.authenticated$.subscribe(
      authStatus => {
        if (authStatus){
          this.route.navigate(['/admin/dashboard'])
        }
      }
    )
  }

  searchedUser$: Observable<User> = of({email: '', password: ''});
  minLength: number = 6;
  maxLength: number = 12;
  verified: boolean = false;

  @Output() userVerifyEvent = new EventEmitter<boolean>();

  private searchedForm = new Subject<User>();

  loginForm = new FormGroup({
    email: new FormControl('',
      [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        
      ]
      ),
    password: new FormControl('', 
      [
        Validators.required,
        Validators.minLength(this.minLength),
        Validators.maxLength(this.maxLength),
        CustomPasswordValidator(/\d/, {hasNumber: true}),
        CustomPasswordValidator(/[A-Z]/, {hasCapitalCase: true}),
        CustomPasswordValidator(/[a-z]/, {hasLowerCase: true}),
        CustomPasswordValidator(/[!@#$%^&*(),.?":{}|<>]/g,{hasSpecialChar: true})
      ])
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
      debounceTime(2000),
      distinctUntilChanged(),
      switchMap(user => {
        return of(user);
      })
    )
    this.searchedUser$.subscribe(user => {
      this.adminService.verifyUser(user);
    });
  }

  
}

