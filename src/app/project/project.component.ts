import { Component, OnInit } from '@angular/core';
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';

import * as mutations from '../graphql/mutations';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  private projectform: FormGroup;
  constructor() { }   
  ngOnInit() {  
      this.projectform = new FormGroup({
        Name: new FormControl('', Validators.required),
    });
  }
 

  async createProject()
  {
          // Mutation
      const ProjectDetails = {
        id:Math.floor(Math.random() * (999999 - 100000)) + 100000,    
        name: this.projectform.get('Name').value,
        status: true
      };

      const newProject= await API.graphql(graphqlOperation(mutations.createProject, {input: ProjectDetails}));

          console.log("create Project")
        }
}