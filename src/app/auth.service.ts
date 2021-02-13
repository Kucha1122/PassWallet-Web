import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { Register } from './Models/register';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from './Models/login';
import { JwtAuthResponse } from './Models/Jwt-Auth-Response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://localhost:5001/Auth';
  isAuth;

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService, private router: Router) { }

  register(register: Register) : Observable<any> {
    let api = `${this.url}/register`;
    return this.httpClient.post(api, register);
  }

  login(login: Login) : Observable<boolean> {
    let api = `${this.url}/login`;
    return this.httpClient.post<JwtAuthResponse>(api, login)
      .pipe(
        map(
          data => {
            this.localStorageService.store('id', data.id);
            this.localStorageService.store('username', data.login);
            this.localStorageService.store('token', data.token);
            this.localStorageService.store('role', data.role);
            this.localStorageService.store('expires', data.expires);
            this.isAuth = this.localStorageService.retrieve('username') != null;
            return true;
          }
        )
      );
  }

  logout() {
    this.localStorageService.clear('id');
    this.localStorageService.clear('username');
    this.localStorageService.clear('token');
    this.localStorageService.clear('role');
    this.localStorageService.clear('expires');
    this.router.navigateByUrl('/login');
  }

  isAuthenticated() : Boolean {
    return this.localStorageService.retrieve('username') != null;
  }
}
