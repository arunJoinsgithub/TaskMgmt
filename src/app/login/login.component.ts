import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource, MatSort, MatPaginator} from '@angular/material'; 
import { RegisterComponent } from '../register/register.component';
import { ForgetpasswordComponent } from '../forgetpassword/forgetpassword.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  openRegisterDialog() {
    const dialogRef = this.dialog.open(RegisterComponent, {
       
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);       
    });
}

}
