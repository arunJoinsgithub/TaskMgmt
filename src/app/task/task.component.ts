import { Component, OnInit, Inject } from '@angular/core';
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { async } from 'q';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material';
import { stringList } from 'aws-sdk/clients/datapipeline';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  title="Add Task"
  actionName="Save"
  selected = 'option2';
  public myapp:string;
  public allProject:any;
  public tasklst:any;
  private taskform: FormGroup;
  constructor(private snackbar: MatSnackBar,@Inject(MAT_DIALOG_DATA) public data: any, ) { 
  }

  ngOnInit() {  
      this.taskform = new FormGroup({
        Name: new FormControl(this.data.taskname, Validators.required),
        Desc: new FormControl(this.data.taskdesc),
        Project:new FormControl(this.data.taskProject),
     
  
        
    });
   
    this.selected=this.data.taskProject;
    this.allProject=this.getProject();  
    this.getProject();
   // this.title="Add Task"
    this.AssignValues();

  }

  async createtask()
  {
          // Mutation
      const taskDetails = {
        
        taskid:Math.floor(Math.random() * (999999 - 100000)) + 100000,        
        desc:this.taskform.value.Name,
        Project:this.selected,
        user:'arun',
        completed:true
      };
      //alert(this.selected);
      const newProject= await API.graphql(graphqlOperation(mutations.createTask, {input: taskDetails}));
      this.snackbar.open('New Task created successfully'+this.taskform.value.Name, '', { duration: 3000, panelClass:"test-panel" , verticalPosition:"top"});
      
  }

  async createtasktable(action:string)
  {
    if(action=="Save"){
          // Mutation
      const tasktableDetails = {       
        id:Math.floor(Math.random() * (999999 - 100000)) + 100000,
        name:this.taskform.value.Name,       
        desc:this.taskform.value.Desc,
        Project:this.selected,
        user:'arun',
        completed:true
      };
     // alert(this.selected);
      const newProject= await API.graphql(graphqlOperation(mutations.createTaskTable, {input: tasktableDetails}));
      this.snackbar.open('New Task table created successfully'+this.taskform.value.Name, '', { duration: 3000, panelClass:"test-panel" , verticalPosition:"top"});
    }
   if(action=="Update"){
      // Mutation
      //alert("Üpdate");
  const tasktableUpdateDetails = {       
    id:this.data.taskid,
    name:this.taskform.value.Name,       
    desc:this.taskform.value.Desc,
    Project:this.selected,
    user:'arun',
    completed:true
  };
  alert(this.selected);
  console.log(tasktableUpdateDetails);
  const updateProject= await API.graphql(graphqlOperation(mutations.updateTaskTable, {input: tasktableUpdateDetails}));
  this.snackbar.open(' Task table updated successfully'+this.taskform.value.Name, '', { duration: 3000, panelClass:"test-panel" , verticalPosition:"top"});
}
  }
 async getProject()
{
  // Simple query
this.allProject = await API.graphql(graphqlOperation(queries.listProjects));
}
async AssignValues()
{
  if(this.data.taskname!=null){
  this.title="Update Task";
  this.actionName="Update";  
}
 //alert(this.data.taskid)
  this.taskform.setValue({Name:this.data.taskname});
}
}     
