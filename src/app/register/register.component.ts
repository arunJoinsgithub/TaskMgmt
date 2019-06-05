import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { V1FormValidators } from '../shared/formvalidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


    signupForm: FormGroup;
    personalInfoForm: FormGroup;
    step: number;
    passwordVisible: boolean;
    confirmPasswordVisible: boolean;
    loading: boolean;

    constructor(private authService: AuthService, private router: Router, private snackbar: MatSnackBar) {
    }

    ngOnInit() {
        this.personalInfoForm = new FormGroup({
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
            department: new FormControl(''),
            employee: new FormControl('')
        });
        this.signupForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, V1FormValidators.passwordValidator]),
            confirmPassword: new FormControl('', Validators.required),
        }, { validators: this.passwordMatchValidator });
        this.step = 1;
        this.passwordVisible = false;
        this.confirmPasswordVisible = false;
        this.loading = false;
    }

    passwordMatchValidator(group: AbstractControl) {
        if (group.get('password').value !== group.get('confirmPassword').value) {
            group.get('confirmPassword').setErrors({ mismatch: true });
        }
        return null;
    }

    personalInfoComplete() {
        if (this.personalInfoForm.valid) {
            this.step = 2;
        }
    }

    goBack() {
        this.step = 1;
    }

    signUp() {
        if (this.signupForm.valid) {
            this.loading = true;
            this.authService.signUp(
                this.signupForm.get('email').value,
                this.signupForm.get('password').value,
                this.personalInfoForm.get('lastName').value,
                this.personalInfoForm.get('firstName').value,
                '+1' + this.personalInfoForm.get('phoneNumber').value,
                this.personalInfoForm.get('department').value,
                '11')
                .then(() => {
                    this.snackbar.open('Successfully created account', '', { duration: 3000 });
                    console.log('Successfully created account');
                    this.router.navigate(['/dashboard']);
                })
                .catch(error => {
                    if (error.code === 'UsernameExistsException') {
                        this.signupForm.get('email').setErrors({ userExists: true });
                        this.loading = false;
                    } else {
                        console.log(error);
                    }
                });
        }
    }}
