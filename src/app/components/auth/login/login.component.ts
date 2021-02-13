import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
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

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      inputUsername: new FormControl(),
      inputPassword: new FormControl()
    });
    this.login = {
      login: '',
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
    this.login.login = this.loginForm.get('inputUsername').value;
    this.login.password = this.loginForm.get('inputPassword').value;

    this.authService.login(this.login)
      .subscribe(
        data => {
          if(data) {
            console.log('Login success');
            this.router.navigateByUrl('/dashboard');
          }else{
            console.log('Login failed');
          }
        }
      )
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  }

}
