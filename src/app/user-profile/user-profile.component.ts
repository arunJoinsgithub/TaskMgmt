import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {  
  email : string ;
  phone :string;
  constructor() {
    this.email= localStorage.getItem('currentUseremail');
    this.phone=localStorage.getItem('currentphone');
  }


  ngOnInit() {
  }

}

