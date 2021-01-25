import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomPasswordValidator } from 'src/app/_validators/customPasswordValidator.directive';
import { AdminDataService } from 'src/app/_services/admin-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  minLength = 6;
  maxLength = 12;
  isSignUpRoute = false;

  constructor(private adminService: AdminDataService, private router: Router) { }

  ngOnInit(): void {
    const user = this.adminService.getUserFromStorage();
    console.log(user)
    if (user && user.isAdmin) this.router.navigate(['admin/dashboard']);
    else if(user && !user.isAdmin) this.router.navigate(['dashboard']);
  }

  signUpForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength),
      CustomPasswordValidator(/\d/, {hasNumber: true}),
      CustomPasswordValidator(/[A-Z]/, {hasUppercaseLetter: true}),
      CustomPasswordValidator(/[a-z]/, {hasLowercaseLetter: true}),
      CustomPasswordValidator(/[!@#$%^&*(),.?":{}|<>]/, {hasSpecialCharacter: true})
    ]),
    isAdmin: new FormControl('false', [
      Validators.required
    ])
  })
  
  get email(){
    return this.signUpForm.get('email') as FormControl;
  }

  get password(){
    return this.signUpForm.get('password') as FormControl;
  }

  get isAdmin(){
    return this.signUpForm.get('isAdmin') as FormControl;
  }

  submitForm(){
    const user = this.signUpForm.value;
    user.isAdmin = user.isAdmin === 'true'? true: false;
    console.log(user)
    this.adminService.addUser(this.signUpForm.value);
  }

}
