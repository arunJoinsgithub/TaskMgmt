import { Component, OnInit } from '@angular/core';
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { async } from 'q';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  selected = 'option2';
  public myapp:string;
  public allProject:any;
  private taskform: FormGroup;
  constructor(private snackbar: MatSnackBar) { 
  }

  ngOnInit() {  
      this.taskform = new FormGroup({
        Name: new FormControl('', Validators.required),
    });
    this.allProject=this.getProject();  
    this.getProject();
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
      alert(this.selected);
      const newProject= await API.graphql(graphqlOperation(mutations.createTask, {input: taskDetails}));
      this.snackbar.open('New Task created successfully'+this.taskform.value.Name, '', { duration: 3000, panelClass:"test-panel" , verticalPosition:"top"});
      
  }
  async getProject()
{
  // Simple query
this.allProject = await API.graphql(graphqlOperation(queries.listProjects));

console.log(this.allProject.data.listProjects);

}

}     
