import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import Amplify, { API, graphqlOperation } from "aws-amplify";
import {AuthService} from '../Services/auth.service';
import { getProject } from '../graphql/queries';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';
import * as subscriptions from '../graphql/subscriptions';
import { async } from '@angular/core/testing';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar} from '@angular/material'; 
import { ProjectComponent } from '../project/project.component';
import { TaskComponent } from '../task/task.component';
import { Auth } from 'aws-amplify';
import { integer } from 'aws-sdk/clients/cloudfront';
import { User } from 'aws-sdk/clients/iam';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { ProfileComponent } from '../profile/profile.component';
import { RegisterComponent } from '../register/register.component';
import { Identifiers } from '@angular/compiler';
import { EmailValidator } from '@angular/forms';
import { delay } from 'q';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  selected = 'SelectALL';
  status=' loggedin'
  email:string;
  currentUser: User;
  public allProject:any;
  public allTasks:any;
  public isAdmin: boolean;
  public isCustomer: boolean;
  loading: boolean;
  myDataSource= new MatTableDataSource(this.allTasks);
  
  constructor(public dialog: MatDialog,private snackbar: MatSnackBar,private ref: ChangeDetectorRef) {
     
      setInterval(() => {
        this.ref.detectChanges();
       }, 5000);
      
  }
  ngOnInit() {
    this.getTaskByFilter();
    this.getProject(); 
  }
  
  
  displayedColumns: string[] = ['SelectTask','desc','Project','user','Action'];
  
  onLoadTasks()
    {
      this.loading=true
     
      this.getTaskByFilter()      
    }
  openProjectDetailsDialog() {
      const dialogRef = this.dialog.open(ProjectComponent, {
         
      });
      dialogRef.afterClosed().subscribe(result => {
    
       this.getProject();      
      });
  }
  openTaskDetailsDialog(id:integer,name:string,desc:string,project:string) {
    
    const dialogRef = this.dialog.open(TaskComponent, {
      data: {taskid:id,taskname:name,taskdesc:desc,taskProject:project}
 
    });
    dialogRef.afterClosed().subscribe(result => {     
      this.getTaskByFilter();
    });

       
}
openUserProfileDialogue() {
    
  const dialogRef = this.dialog.open(UserProfileComponent, {    
  });
  dialogRef.afterClosed().subscribe(result => {    
  });
}

async getProject()
{
      // Simple query
    this.allProject = await API.graphql(graphqlOperation(queries.listProjects));   
}

async getTaskByFilter()
{
  
if (this.selected==='SelectALL')
{
 
      const searchFilterUser={user:{eq:localStorage.getItem('currentUseremail')}}
    // Query using a parameter
    this.allTasks = await API.graphql(graphqlOperation(queries.listTaskTables, {filter: searchFilterUser}));
    this.myDataSource.data = this.allTasks.data.listTaskTables;
    this.loading=false;
}
else
{
  const searchFilter={Project:{eq:this.selected},user:{eq:localStorage.getItem('currentUseremail')}}
  // Query using a parameter
  this.allTasks = await API.graphql(graphqlOperation(queries.listTaskTables, {filter: searchFilter}));

  this.myDataSource.data = this.allTasks.data.listTaskTables;
  this.loading=false;
  }
}

async onDelete(taskid:Identifiers)
{ 
  const DeleteTaskTableInput ={
    id: taskid
  }
  await API.graphql(graphqlOperation(mutations.deleteTaskTable, {input: DeleteTaskTableInput}));
  this.snackbar.open(' Task deleted successfully', '', { duration: 3000, panelClass:"test-panel" , verticalPosition:"top"});
  this.getTaskByFilter();
}
}

export interface taskElement {
  taskid:number;
  desc:string;
  Project:string;
  user:string;
  completed:boolean
  
}
