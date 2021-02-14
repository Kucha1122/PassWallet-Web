import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../home/home.component';


@Component({
  selector: 'app-add-password-dialog',
  templateUrl: './add-password-dialog.component.html',
  styleUrls: ['./add-password-dialog.component.css']
})
export class AddPasswordDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
