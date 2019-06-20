import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import {MediaMatcher} from '@angular/cdk/layout';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { ProfileComponent } from '../profile/profile.component';
import { GoogleChartComponent } from 'angular-google-charts';
import { MytaskComponent } from '../mytask/mytask.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  status:string;
  isLoggedin=false;
  user:string;  
 //constructor(public dialog: MatDialog) { }

 /* ngOnInit() {
  }
  openLoginDetailsDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
       
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
}
openRegisterDetailsDialog() {
  const dialogRef = this.dialog.open(RegisterComponent, {
     
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}*/
openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 4000000,
    panelClass: "test-panel",
    verticalPosition: 'top'
    
  });
  
}
 mobileQuery: MediaQueryList;
 ngOnInit() {
   if(localStorage.getItem('currentUseremail')!=null){
  this.user= "Hello, "+localStorage.getItem('currentUseremail');
 // alert(this.user);
}
//alert(this.user);
  // this.status=localStorage.getItem('status');
}
  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from({length: 50}, () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);

  private _mobileQueryListener: () => void;

  constructor(private router: Router,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private _snackBar: MatSnackBar,public dialog: MatDialog,private ref: ChangeDetectorRef) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener,);
    setInterval(() => {
      this.ref.detectChanges();
     }, 20);
  }
  signOut()
  {
    localStorage.removeItem('currentUseremail');
    this.router.navigateByUrl('/logOff')
  }
  openUserProfileDialogue() {    
    const dialogRef = this.dialog.open(ProfileComponent, {      
    });
    dialogRef.afterClosed().subscribe(result => {
    
      
    });
  }
  openMyTaskeDialogue() {   
    
    const dialogRef = this.dialog.open(MytaskComponent, {      
    });
    dialogRef.afterClosed().subscribe(result => {
    
      
    });
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  
}
