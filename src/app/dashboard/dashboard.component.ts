import { Component, OnInit } from '@angular/core';
import Amplify, { API, graphqlOperation } from "aws-amplify";
import {AuthService} from '../Services/auth.service';
import { getProject } from '../graphql/queries';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';
import { async } from '@angular/core/testing';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource, MatSort, MatPaginator} from '@angular/material'; 
import { ProjectComponent } from '../project/project.component';
import { TaskComponent } from '../task/task.component';
import { Auth } from 'aws-amplify';
import { integer } from 'aws-sdk/clients/cloudfront';
import { User } from 'aws-sdk/clients/iam';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { ProfileComponent } from '../profile/profile.component';
import { RegisterComponent } from '../register/register.component';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selected = 'option2';
  status=' loggedin'
  currentUser: User;
  public allProject:any;
  public allTasks:any;
  public isAdmin: boolean;
  public isCustomer: boolean;
  myDataSource= new MatTableDataSource(this.allTasks); 
  constructor(public dialog: MatDialog) {
    
  }
  ngOnInit() {
    this.allTasks=this.getTask();
    this.allProject=this.getProject();
    this.getTask();
    this.getProject();
    
    
  }
 


 //displayedColumns: string[] = ['SelectTask','taskid','desc', 'Project', 'user', 'completed','Action'];
  //myDataSource: taskElement[] = this.allTasks.listProjects;
  displayedColumns: string[] = ['SelectTask','desc','Project','user','Action'];
  /**
     * Open Project details dialog
     */
  openProjectDetailsDialog() {
      const dialogRef = this.dialog.open(ProjectComponent, {
         
      });
      dialogRef.afterClosed().subscribe(result => {
       // console.log(`Dialog result: ${result}`);       
      });
  }
  openTaskDetailsDialog(name) {
    
    const dialogRef = this.dialog.open(TaskComponent, {
      data: {taskname:name}
    });
    dialogRef.afterClosed().subscribe(result => {
     // console.log(`Dialog result: ${result}`);
      //alert(taskId+this.selected);
    });

       
}
openUserProfileDialogue() {
    
  const dialogRef = this.dialog.open(ProfileComponent, {
    
  });
  dialogRef.afterClosed().subscribe(result => {
  
    
  });
}
async getProject()
{
  // Simple query
this.allProject = await API.graphql(graphqlOperation(queries.listProjects));

//console.log(this.allProject.data.listProjects);


}
 getUser()
 {

 localStorage.getItem('currentUser');
 
 }

async getTask()
{
  
// Query using a parameter
this.allTasks = await API.graphql(graphqlOperation(queries.listTaskTables));
this.myDataSource.data = this.allTasks.data.listTaskTables;
//console.log(this.myDataSource.data);
}

async Delete(taskid:integer)
{
  
  console.log(taskid)
  const deltaskdetails = {
    taskid:taskid,
    desc:'task',
    Project:'test',
    user:'arun',
    completed:true
  };
 // Query using a parameter
//const oneTodo = await API.graphql(graphqlOperation(queries.getTask, { id: '4bc5f181-d501-4564-8f1e-b9f6aabd22ea' }));
//console.log(oneTodo);
 // await API.graphql(graphqlOperation(mutations.deleteTask, {id: "a6c78c64-6a0f-44fa-9e20-bc97cf53c0b4"}));
 //await API.graphql(graphqlOperation(mutations.deleteTaskbyTaskid));
  //console.log("delete task")
 alert(taskid)
  await API.graphql(graphqlOperation(mutations.deleteTaskTable, {id: "243384"}));
}
}

export interface taskElement {
  taskid:number;
  desc:string;
  Project:string;
  user:string;
  completed:boolean
  
}
