import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomPasswordValidator } from 'src/app/_validators/customPasswordValidator.directive';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  minLength = 6;
  maxLength = 12;
  constructor() { }

  ngOnInit(): void {
  }

  signUpForm = new FormGroup({
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
    ownership: new FormControl('user', [
      Validators.required
    ])
  })
  
  get email(){
    return this.signUpForm.get('email') as FormControl;
  }

  get password(){
    return this.signUpForm.get('password') as FormControl;
  }

  get ownership(){
    return this.signUpForm.get('ownership') as FormControl;
  }

  submitForm(){
    console.log(this.signUpForm.value)
  }

}
