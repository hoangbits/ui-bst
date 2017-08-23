import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers : [
    LoginService
  ]
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  remember: boolean;
  message: string;
  adLoginForm: FormGroup;

  formErrors = {
    email: '',
    password: ''
  };

  validationMessages = {
    email: {
      required: "Email is required",
      email: 'Email in invalid email'
    },
    password: {
      required: "Password is required.",
      minlength: "Password must min is 6"
    }
  }

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  onLogin (email : string, password : string, remember: boolean, isvalid : boolean) {
    const dataForm = this.adLoginForm.value;

    this.loginService.Login(dataForm).subscribe(
      data => {
        this.message = 'login success';
        localStorage.clear();
        if (dataForm.remember) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', data.user);
          localStorage.setItem('expiresTime', data.expiresTime);
          localStorage.setItem('remember', 'true');
        }
        setTimeout(() => {
          window.location.href = '/admin/company';
        }, 3000);
      },

      err => {
        this.message = 'Invalid email or password' ;
      }
    );
  }

  createForm(){
    this.adLoginForm = this.formBuilder.group({
      email: ["nam@gmail.com", [Validators.required] ],
      password: [],
      remember: [true]
    });

    this.adLoginForm.valueChanges.subscribe(data => {
      this.onValueChanged(data);
    });

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if (!this.adLoginForm) {
      return;
    }
    const form = this.adLoginForm;
    for(const field in this.formErrors){

      this.formErrors[field] = "";// clear the previous message (if any)
      const control = form.get(field);

      if(control && control.dirty && !control.valid){
        const messages = this.validationMessages[field];

        if (Object.keys(control.errors).length > 1) {
          delete control.errors.required;
        }

        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + " ";
        }
      }
    }
  }

}