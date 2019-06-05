import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { AuthService } from '../../services/auth.service';

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
              private authService: AuthService,
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
                
                  console.log(result);
                  this.router.navigateByUrl('dashboard')
                  this.loading = false;
                  console.log(result);
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

  decodeChallenge(result) {
      switch (result.challengeName) {
          case 'NEW_PASSWORD_REQUIRED':
              // TODO: create UI for new password
              break;
          default:
              console.log(result.challengeName);
              break;
      }
  }

}