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


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
 
 
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
 


 displayedColumns: string[] = ['SelectTask','taskid','desc', 'Project', 'user', 'completed','Action'];
  //myDataSource: taskElement[] = this.allTasks.listProjects;
  
  /**
     * Open Project details dialog
     */
  openProjectDetailsDialog() {
      const dialogRef = this.dialog.open(ProjectComponent, {
         
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
  }
  openTaskDetailsDialog(taskId) {
    
    const dialogRef = this.dialog.open(TaskComponent, {
      data: taskId
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
}
async getProject()
{
  // Simple query
this.allProject = await API.graphql(graphqlOperation(queries.listProjects));

console.log(this.allProject.data.listProjects);

}

async getTask()
{
  
// Query using a parameter
this.allTasks = await API.graphql(graphqlOperation(queries.listTasks));
this.myDataSource.data = this.allTasks.data.listTasks;
console.log(this.myDataSource.data);
}

async Delete()
{
  
  console.log("delete task")
  const deltaskdetails = {
    taskid:11,
    desc:'task',
    Project:'test',
    user:'arun',
    completed:true
  };
  await API.graphql(graphqlOperation(mutations.deleteTask, {input: deltaskdetails}));

  console.log("delete task")
}
}

export interface taskElement {
  taskid:number;
  desc:string;
  Project:string;
  user:string;
  completed:boolean
  
}
