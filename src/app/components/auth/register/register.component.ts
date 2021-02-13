import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ConfirmedValidator } from 'src/app/confirmed.validator';
import { Register } from 'src/app/Models/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  register: Register;
  hide: true;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.formBuilder.group({
      inputUsername: '',
      inputEmail: '',
      inputPassword: '',
      confirmPassword: ''
    });
    this.register = {
      login: '',
      password: '',
      confirmPassword: ''
    };
   }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      inputUsername: ['', Validators.required],
      inputPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required, ],
    },{
      validator: ConfirmedValidator('inputPassword', 'confirmPassword')
    })
  }

  onSubmit() {
    this.register.login = this.registerForm.get('inputUsername').value;
    this.register.password = this.registerForm.get('inputPassword').value;
    this.register.confirmPassword = this.registerForm.get('confirmPassword').value;

    this.authService.register(this.register)
      .subscribe(
        data => {
          console.log("Register success");
          this.router.navigateByUrl('/login');
        },
        error => {
          console.log("Register failed");
        }
      )
  }

  get fval() {
    return this.registerForm.controls;
  }

  public checkError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }
}
