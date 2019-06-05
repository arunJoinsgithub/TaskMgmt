import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-logoff',
  templateUrl: './logoff.component.html',
  styleUrls: ['./logoff.component.css']
})
export class LogoffComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
 signOut()
 {
  Auth.signOut()
  .then(data => console.log(data))
  .catch(err => console.log(err));

// By doing this, you are revoking all the auth tokens(id token, access token and refresh token)
// which means the user is signed out from all the devices
// Note: although the tokens are revoked, the AWS credentials will remain valid until they expire (which by default is 1 hour)
Auth.signOut({ global: true })
  .then(data => console.log(data))
  .catch(err => console.log(err));
 }
}



