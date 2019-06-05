import { Injectable } from '@angular/core';
import { AmplifyService } from 'aws-amplify-angular';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  signedIn: boolean;
  user: UserInterface;

  constructor(private amplifyService: AmplifyService
             ) {
      /** Get user status on page refresh */
     // this.signedIn = this.appState.get('signedIn');

      this.amplifyService.authStateChange$.subscribe(
          authState => {
              this.signedIn = authState.state === 'signedIn';
              console.log(authState);
              if (authState.user) {
                  const cognitoGroups = authState.user.signInUserSession.accessToken.payload['cognito:groups'];
                  this.user = {
                      username: authState.user.username,
                      email: authState.user.attributes.email,
                      family_name: authState.user.attributes.family_name,
                      name: authState.user.attributes.name,
                      phone_number: authState.user.attributes.phone_number,
                      group: cognitoGroups ? cognitoGroups[0] : null,
                      jwtToken: authState.user.signInUserSession.accessToken.jwtToken
                  };
              } else {
                  this.user = null;
              }
             // this.appState.set('signedIn', this.signedIn);
          }, () => {
              this.user = null;
              this.signedIn = false;
              //this.appState.set('signedIn', this.signedIn);
          });
  }

  signUp(email: string, password: string, lastName: string, firstName: string, phone: string, departmentId: string, employeeId: string) {
      return this.amplifyService.auth().signUp({
          username: email,
          password,
          attributes: {
              email,
              family_name: lastName,
              name: firstName,
              phone_number: phone,
              'custom:department': departmentId,
              'custom:employee_id': employeeId,
              'custom:district': 'jeffco'
          }
      });
  }

  login(userName: string, password: string) {
    
      return this.amplifyService.auth().signIn(userName, password);
  }

  logout() {
     // this.appState.reset();
      return this.amplifyService.auth().signOut();
  }

  forgotPassword(username: string) {
      return this.amplifyService.auth().forgotPassword(username);
  }

  forgotPasswordSubmit(userName: string, code: string, password: string) {
      return this.amplifyService.auth().forgotPasswordSubmit(userName, code, password);
  }

  getToken() {
      return this.user.jwtToken;
  }

}

export interface UserInterface {
  username: string;
  email: string;
  family_name: string;
  name: string;
  phone_number: string;
  group: string | null;
  jwtToken: string;
}