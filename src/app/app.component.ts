import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading=false;
  title = 'task-mgmt';
 
   type:string= 'PieChart';
   data = [
      ['HR Project', 40],
      ['ADMIN Project', 25],
      ['TEST Project', 15],
      ['EMPLOYEE Project', 20]
    
   ];
   columnNames = ['Project', 'Task'];
   options = {    
   };
   width = 550;
   height = 400;
 
}
