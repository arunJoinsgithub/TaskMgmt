import { Component, OnInit } from '@angular/core';
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { async } from 'q';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  public allProject:any;
  private taskform: FormGroup;
  constructor() { 
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
        desc:this.taskform.get('Name').value,
        Project:this.taskform.get('Name').value,
        user:'arun',
        completed:true
      };

      const newProject= await API.graphql(graphqlOperation(mutations.createTask, {input: taskDetails}));
      
  }
  async getProject()
{
  // Simple query
this.allProject = await API.graphql(graphqlOperation(queries.listProjects));

console.log(this.allProject.data.listProjects);

}

}     
