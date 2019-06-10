import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource, MatSort, MatPaginator} from '@angular/material'; 
import { MatSnackBar } from '@angular/material/snack-bar';


import { AuthService } from '../../services/auth.service';
import { ForgetpasswordComponent } from 'src/app/forgetpassword/forgetpassword.component';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup;
  showPassword: boolean;
  loading: boolean;

  constructor(private router: Router,
              private authService: AuthService,public dialog: MatDialog, private snackbar: MatSnackBar
             ) {
  }

  ngOnInit() {
      this.loginForm = new FormGroup({
          email: new FormControl('', [Validators.required, Validators.email]),
          password: new FormControl('', Validators.required)
      });
  }

  public ngAfterViewInit() {
      /** Reset Config to avoid conflicts in activated outlet */
      if (this.router.config.length > 0) {
          this.router.resetConfig(this.router.config);
      }
  }

  login() {
    
      if (this.loginForm.valid) {
          this.loading = true;
          this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
              .then(result => {
                this.snackbar.open('You are logged in as..'+this.loginForm.get('email').value, '', { duration: 3000, panelClass:"test-panel" , verticalPosition:"top"});
                  console.log(result);
                  this.router.navigateByUrl('dashboard')
                  this.loading = false;
                  console.log(result);
                  if (result.token && result) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(result));
                   console.log( localStorage.getItem('currentUser'));
                }
              })
              .catch(error => {
                  this.loading = false;
                  switch (error.code) {
                      case 'UserNotFoundException':
                          this.loginForm.get('email').setErrors({ userNotFound: true });
                          break;
                      case 'NotAuthorizedException':
                          if (error.message.includes('User is disabled')) {
                            
                          } else if (error.message.includes('Password attempts exceeded')) {
                             
                          } else {
                              this.loginForm.get('password').setErrors({ passwordError: true });
                          }
                          break;
                      default:
                          console.log(error);
                          break;
                  }
              });
      }
  }

  

  openForgetPassword() {
  
    const dialogRef = this.dialog.open(ForgetpasswordComponent, {
      
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      
    });
  }

}