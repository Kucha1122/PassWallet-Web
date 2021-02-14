import {AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Password } from 'src/app/Models/Password';
import { PasswordService } from 'src/app/password.service';
import { AddPasswordDialogComponent } from '../add-password-dialog/add-password-dialog.component';


export interface DialogData {
  passwordHash: String;
  website: String;
  login: String;
  description: String;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'passwordHash', 'website', 'login', 'description'];
  passwords: Array<Password>;
  dataSource: MatTableDataSource<Password>;
  newPassword: Password = new Password();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit(){
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  constructor(private passwordService: PasswordService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.passwordService.getAllPasswords()
      .subscribe(
        data =>{
          this.passwords = data;
          this.dataSource = new MatTableDataSource<Password>(this.passwords);
        }
      )   
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddPasswordDialogComponent, {
      width: '300px',
      data: {passwordHash: this.newPassword.passwordHash, website: this.newPassword.website, login: this.newPassword.login, description: this.newPassword.description},
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        console.log("The dialog was closed");
        if(result){

        }
      });
  }
  

}
