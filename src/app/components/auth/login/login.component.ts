import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Login } from './Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  login: Login;
  hide: true;

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = new FormGroup({
      inputUsername: new FormControl(),
      inputPassword: new FormControl()
    });
    this.login = {
      username: '',
      password: ''
    }
   }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      inputUsername: ['', Validators.required],
      inputPassword: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit(){

  }

  public checkError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

}
