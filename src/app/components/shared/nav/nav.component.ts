import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  username: string;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.username = this.localStorageService.retrieve('username');
  }

}
