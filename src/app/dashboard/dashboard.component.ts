import { Component, OnInit, ViewChild } from '@angular/core';
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

  selected = 'AllOption';
  status=' loggedin'
  email:string;
  currentUser: User;
  public allProject:any;
  public allTasks:any;
  public isAdmin: boolean;
  public isCustomer: boolean;
  loading: boolean;
  myDataSource= new MatTableDataSource(this.allTasks);
  
  constructor(public dialog: MatDialog,private snackbar: MatSnackBar) {
    this.myDataSource.paginator = this.paginator;
  }
  ngOnInit() {
   // this.allTasks=this.getTask();
   // this.allProject=this.getProject();
    this.getTask();
    this.getProject();
    this.allTasks.data.listTaskTables.paginator = this.paginator; 
    this.email= localStorage.getItem('currentUseremail');  
    
    
  }
  ngAfterViewInit() {
    this.allTasks.data.listTaskTables.paginator = this.paginator;   
  }
 //displayedColumns: string[] = ['SelectTask','taskid','desc', 'Project', 'user', 'completed','Action'];
  //myDataSource: taskElement[] = this.allTasks.listProjects;
  displayedColumns: string[] = ['SelectTask','desc','Project','user','Action'];
  /**
     * Open Project details dialog
     */

    onLoadTasks()
    {
      this.loading=true
      //alert(this.selected);
      this.getTask()      
    }
  openProjectDetailsDialog() {
      const dialogRef = this.dialog.open(ProjectComponent, {
         
      });
      dialogRef.afterClosed().subscribe(result => {
       // console.log(`Dialog result: ${result}`); 
       this.getProject();      
      });
  }
  openTaskDetailsDialog(id:integer,name:string,desc:string,project:string) {
    
    const dialogRef = this.dialog.open(TaskComponent, {
      data: {taskid:id,taskname:name,taskdesc:desc,taskProject:project}
 
    });
    dialogRef.afterClosed().subscribe(result => {
     // console.log(`Dialog result: ${result}`);
      //alert(taskId+this.selected);
      this.getTask();
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
  
if (this.selected==='AllOption')
{
  this.allTasks = await API.graphql(graphqlOperation(queries.listTaskTables));
  this.myDataSource.data = this.allTasks.data.listTaskTables;
  this.loading=false;
}
else
{
const searchFilter={Project:{eq:this.selected}}
// Query using a parameter
this.allTasks = await API.graphql(graphqlOperation(queries.listTaskTables, {filter: searchFilter}));

this.myDataSource.data = this.allTasks.data.listTaskTables;
this.loading=false;
}
}

async Delete(taskid:Identifiers)
{
  
  console.log(taskid)
  const deltaskdetails = {
    taskid:taskid,
    desc:'task',
    Project:'test',
    user:this.email,
    completed:true
  };
  const DeleteTaskTableInput ={
    id: taskid
  }
 // Query using a parameter
//const oneTodo = await API.graphql(graphqlOperation(queries.getTask, { id: '4bc5f181-d501-4564-8f1e-b9f6aabd22ea' }));
//console.log(oneTodo);
 // await API.graphql(graphqlOperation(mutations.deleteTask, {id: "a6c78c64-6a0f-44fa-9e20-bc97cf53c0b4"}));
 //await API.graphql(graphqlOperation(mutations.deleteTaskbyTaskid));
  //console.log("delete task")
 //alert(taskid)
  await API.graphql(graphqlOperation(mutations.deleteTaskTable, {input: DeleteTaskTableInput}));
  this.snackbar.open(' Task deleted successfully', '', { duration: 3000, panelClass:"test-panel" , verticalPosition:"top"});
  this.getTask();
}
}

export interface taskElement {
  taskid:number;
  desc:string;
  Project:string;
  user:string;
  completed:boolean
  
}
