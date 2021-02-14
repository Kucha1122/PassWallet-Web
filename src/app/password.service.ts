import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Password } from './Models/Password';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  private url = 'https://localhost:5001/Password';

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService, private router: Router) { }

  getAllPasswords() : Observable<Array<Password>>{
    let api = `${this.url}/all`;
    return this.httpClient.get<Array<Password>>(api);
  }
}
