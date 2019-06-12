import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  email : string ;
  phone :string;
  constructor() { }

  ngOnInit() {
    this.email= localStorage.getItem('currentUseremail');
    this.phone=localStorage.getItem('currentphone');
  }

}
