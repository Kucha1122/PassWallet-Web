import {AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'password', 'website', 'login', 'description'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA); 
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }

  constructor() { }

  ngOnInit(): void {
  }
  

}

export interface PeriodicElement {
  id: number;
  password: string;
  website: string;
  login: string;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, password: 'Hydrogen', website: 'onet.pl', login: 'Loginek', description: 'Opis'},
  {id: 2, password: 'Hydrogen', website: 'wp.pl', login: 'Loginek2', description: 'Opis'}];
